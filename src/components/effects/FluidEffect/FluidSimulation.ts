import type { ColorRepresentation, WebGLRenderer } from 'three'
import { Color, LinearFilter, MathUtils, NearestFilter, RGBAFormat, Uniform, Vector2, WebGLRenderTarget } from 'three'
import { getFloatType } from '@/utils/helpers'
import FluidFBO from './utils/FluidFBO'
import FluidScene from './utils/FluidScene'
import shaders from './shaders'

export interface FluidSimulationDrawMouseArgs {
  x: number
  y: number
  dx: number
  dy: number
  color: ColorRepresentation
  radius: number
}

class FluidSimulation {
  public static readonly SIM_SIZE = 256
  public static readonly DYE_SIZE = 512
  public static readonly DEFAULT_DENSITY_DISSIPATION = 0.99
  public static readonly DEFAULT_VELOCITY_DISSIPATION = 0.98
  public static readonly DEFAULT_PRESSURE_DISSIPATION = 0.99
  public static readonly DEFAULT_PRESSURE_ITERATIONS = 1
  public static readonly DEFAULT_CURL = 20
  public static readonly DEFAULT_DT = 0.016
  public static readonly DEFAULT_SPLAT_RADIUS = 10
  public static readonly DEFAULT_IS_ADDITIVE = true

  private config = {
    resolution: new Vector2(),
    densityDissipation: FluidSimulation.DEFAULT_DENSITY_DISSIPATION,
    velocityDissipation: FluidSimulation.DEFAULT_VELOCITY_DISSIPATION,
    pressureDissipation: FluidSimulation.DEFAULT_PRESSURE_DISSIPATION,
    pressureIterations: FluidSimulation.DEFAULT_PRESSURE_ITERATIONS,
    curl: FluidSimulation.DEFAULT_CURL,
    dt: FluidSimulation.DEFAULT_DT,
    splatRadius: FluidSimulation.DEFAULT_SPLAT_RADIUS,
    isAdditive: FluidSimulation.DEFAULT_IS_ADDITIVE,
  }
  private rt: WebGLRenderTarget
  private fbos!: Record<string, FluidFBO>
  private scenes!: Record<string, FluidScene>

  constructor(resolution: Vector2) {
    this.config.resolution = resolution
    this.rt = new WebGLRenderTarget(resolution.x, resolution.y, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      type: getFloatType(),
      generateMipmaps: false,
      depthBuffer: false,
    })
    this.initFBOs()
    this.initScenes()
  }

  get fluid() {
    return this.fbos.velocity.read
  }

  get fluidMask() {
    return this.rt.texture
  }

  get densityDissipation() {
    return this.config.densityDissipation
  }
  set densityDissipation(v: number) {
    this.config.densityDissipation = v
  }

  get velocityDissipation() {
    return this.config.velocityDissipation
  }
  set velocityDissipation(v: number) {
    this.config.velocityDissipation = v
  }

  get pressureDissipation() {
    return this.config.pressureDissipation
  }
  set pressureDissipation(v: number) {
    this.config.pressureDissipation = v
  }

  get pressureIterations() {
    return this.config.pressureIterations
  }
  set pressureIterations(v: number) {
    this.config.pressureIterations = v
  }

  get curl() {
    return this.config.curl
  }
  set curl(v: number) {
    this.config.curl = v
  }

  get dt() {
    return this.config.dt
  }
  set dt(v: number) {
    this.config.dt = v
  }

  get splatRadius() {
    return this.config.splatRadius
  }
  set splatRadius(v: number) {
    this.config.splatRadius = v
  }

  get isAdditive() {
    return this.config.isAdditive
  }
  set isAdditive(v: boolean) {
    this.config.isAdditive = v
  }

  private initFBOs() {
    this.fbos = {}
    this.fbos.density = new FluidFBO({ size: FluidSimulation.DYE_SIZE, filter: LinearFilter })
    this.fbos.velocity = new FluidFBO({ size: FluidSimulation.SIM_SIZE, filter: LinearFilter })
    this.fbos.divergence = new FluidFBO({ size: FluidSimulation.SIM_SIZE, filter: NearestFilter })
    this.fbos.curl = new FluidFBO({ size: FluidSimulation.SIM_SIZE, filter: NearestFilter })
    this.fbos.pressure = new FluidFBO({ size: FluidSimulation.SIM_SIZE, filter: NearestFilter })
  }

  private initScenes() {
    const texelSize = 1 / FluidSimulation.SIM_SIZE

    this.scenes = {}
    this.scenes.curl = new FluidScene({
      vertexShader: shaders.base,
      fragmentShader: shaders.curl,
      uniforms: {
        uTexelSize: new Uniform(new Vector2(texelSize, texelSize)),
        tVelocity: new Uniform(null),
      },
    })
    this.scenes.vorticity = new FluidScene({
      vertexShader: shaders.base,
      fragmentShader: shaders.vorticity,
      uniforms: {
        uTexelSize: new Uniform(new Vector2(texelSize, texelSize)),
        tVelocity: new Uniform(null),
        tCurl: new Uniform(null),
        uCurl: new Uniform(this.config.curl),
        uDt: new Uniform(this.config.dt),
      },
    })
    this.scenes.divergence = new FluidScene({
      vertexShader: shaders.base,
      fragmentShader: shaders.divergence,
      uniforms: {
        uTexelSize: new Uniform(new Vector2(texelSize, texelSize)),
        tVelocity: new Uniform(null),
      },
    })
    this.scenes.clear = new FluidScene({
      vertexShader: shaders.base,
      fragmentShader: shaders.clear,
      uniforms: {
        tTexture: new Uniform(null),
        uValue: new Uniform(this.config.pressureDissipation),
      },
    })
    this.scenes.pressure = new FluidScene({
      vertexShader: shaders.base,
      fragmentShader: shaders.pressure,
      uniforms: {
        uTexelSize: new Uniform(new Vector2(texelSize, texelSize)),
        tPressure: new Uniform(null),
        tDivergence: new Uniform(null),
      },
    })
    this.scenes.gradientSubtract = new FluidScene({
      vertexShader: shaders.base,
      fragmentShader: shaders.gradientSubtract,
      uniforms: {
        uTexelSize: new Uniform(new Vector2(texelSize, texelSize)),
        tPressure: new Uniform(null),
        tVelocity: new Uniform(null),
      },
    })
    this.scenes.advection = new FluidScene({
      vertexShader: shaders.base,
      fragmentShader: shaders.advection,
      uniforms: {
        uTexelSize: new Uniform(new Vector2(texelSize, texelSize)),
        tVelocity: new Uniform(null),
        tSource: new Uniform(null),
        uDt: new Uniform(this.config.dt),
        uDissipation: new Uniform(this.config.velocityDissipation),
      },
    })
    this.scenes.display = new FluidScene({
      vertexShader: shaders.base,
      fragmentShader: shaders.display,
      uniforms: {
        uTexelSize: new Uniform(new Vector2(1 / this.config.resolution.x, 1 / this.config.resolution.y)),
        tTexture: new Uniform(null),
      },
    })
    this.scenes.splat = new FluidScene({
      vertexShader: shaders.base,
      fragmentShader: shaders.splat,
      uniforms: {
        tTarget: new Uniform(null),
        uAspectRatio: new Uniform(this.config.resolution.x / this.config.resolution.y),
        uPoint: new Uniform(new Vector2()),
        uColor: new Uniform(new Color()),
        uRadius: new Uniform(this.config.splatRadius / 1e4),
        uCanRender: new Uniform(0),
        uAdd: new Uniform(1),
      },
    })
  }

  public frame(gl: WebGLRenderer) {
    const simSize = 1 / FluidSimulation.SIM_SIZE
    const dyeSize = 1 / FluidSimulation.DYE_SIZE
    this.scenes.curl.uniforms.uTexelSize.value.set(simSize, simSize)
    this.scenes.vorticity.uniforms.uTexelSize.value.set(simSize, simSize)
    this.scenes.divergence.uniforms.uTexelSize.value.set(simSize, simSize)
    this.scenes.pressure.uniforms.uTexelSize.value.set(simSize, simSize)
    this.scenes.gradientSubtract.uniforms.uTexelSize.value.set(simSize, simSize)

    this.scenes.curl.uniforms.tVelocity.value = this.fbos.velocity.read
    this.scenes.curl.frame(gl, this.fbos.curl.fbo)

    this.scenes.vorticity.uniforms.tVelocity.value = this.fbos.velocity.read
    this.scenes.vorticity.uniforms.tCurl.value = this.fbos.curl.fbo.texture
    this.scenes.vorticity.uniforms.uCurl.value = this.config.curl
    this.scenes.vorticity.frame(gl, this.fbos.velocity.write)
    this.fbos.velocity.swap()

    this.scenes.divergence.uniforms.tVelocity.value = this.fbos.velocity.read
    this.scenes.divergence.frame(gl, this.fbos.divergence.fbo)

    this.scenes.clear.uniforms.tTexture.value = this.fbos.pressure.read
    this.scenes.clear.uniforms.uValue.value = this.config.pressureDissipation
    this.scenes.clear.frame(gl, this.fbos.pressure.write)
    this.fbos.pressure.swap()

    this.scenes.pressure.uniforms.tDivergence.value = this.fbos.divergence.fbo.texture
    for (let i = 0; i < this.config.pressureIterations; i++) {
      this.scenes.pressure.uniforms.tPressure.value = this.fbos.pressure.read
      this.scenes.pressure.frame(gl, this.fbos.pressure.write)
      this.fbos.pressure.swap()
    }

    this.scenes.gradientSubtract.uniforms.tPressure.value = this.fbos.pressure.read
    this.scenes.gradientSubtract.uniforms.tVelocity.value = this.fbos.velocity.read
    this.scenes.gradientSubtract.frame(gl, this.fbos.velocity.write)
    this.fbos.velocity.swap()

    this.scenes.advection.uniforms.uTexelSize.value.set(simSize, simSize)
    this.scenes.advection.uniforms.tVelocity.value = this.fbos.velocity.read
    this.scenes.advection.uniforms.tSource.value = this.fbos.velocity.read
    this.scenes.advection.uniforms.uDissipation.value = this.config.velocityDissipation
    this.scenes.advection.frame(gl, this.fbos.velocity.write)
    this.fbos.velocity.swap()

    this.scenes.advection.uniforms.uTexelSize.value.set(dyeSize, dyeSize)
    this.scenes.advection.uniforms.tVelocity.value = this.fbos.velocity.read
    this.scenes.advection.uniforms.tSource.value = this.fbos.density.read
    this.scenes.advection.uniforms.uDissipation.value = this.config.densityDissipation
    this.scenes.advection.frame(gl, this.fbos.density.write)
    this.fbos.density.swap()

    this.scenes.display.uniforms.tTexture.value = this.fbos.density.read
    this.scenes.display.uniforms.uTexelSize.value.set(1 / this.config.resolution.x, 1 / this.config.resolution.y)
    this.scenes.display.frame(gl, this.rt)
  }

  public drawMouse(gl: WebGLRenderer, args: FluidSimulationDrawMouseArgs) {
    const dx = MathUtils.clamp(args.dx, 5 * -this.config.resolution.x, 5 * this.config.resolution.x)
    const dy = MathUtils.clamp(args.dy, 5 * -this.config.resolution.y, 5 * this.config.resolution.y)
    this.scenes.splat.uniforms.tTarget.value = this.fbos.velocity.read
    this.scenes.splat.uniforms.uRadius.value = args.radius / 1e4
    this.scenes.splat.uniforms.uAspectRatio.value = this.config.resolution.x / this.config.resolution.y
    this.scenes.splat.uniforms.uPoint.value.set(args.x / this.config.resolution.x, 1 - args.y / this.config.resolution.y)
    this.scenes.splat.uniforms.uColor.value.set(dx, -dy, 1)
    this.scenes.splat.uniforms.uAdd.value = 1
    this.scenes.splat.frame(gl, this.fbos.velocity.write)
    this.fbos.velocity.swap()
    this.scenes.splat.uniforms.tTarget.value = this.fbos.density.read
    this.scenes.splat.uniforms.uColor.value.set(args.color)
    this.scenes.splat.uniforms.uAdd.value = this.config.isAdditive ? 1 : 0
    this.scenes.splat.frame(gl, this.fbos.density.write)
    this.fbos.density.swap()
    this.scenes.splat.uniforms.uCanRender.value = 1
  }
}

export default FluidSimulation

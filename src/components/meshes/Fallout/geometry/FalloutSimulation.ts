import { Mesh, OrthographicCamera, PlaneGeometry, Scene, Uniform, Vector3 } from 'three'
import type { DataTexture, Texture, WebGLRenderer, WebGLRenderTarget } from 'three'
import Material from '@/api/Material'
import { createDataTexture, createRenderTarget, random } from '@/utils/helpers'
import shaders from './shaders'

class FalloutSimulation extends Material {
  public static readonly DEFAULT_FORCE_DIR = new Vector3(-1, 0, 0)
  public static readonly DEFAULT_FORCE_SCALE = 0.004
  public static readonly DEFAULT_CURL_NOISE_SCALE = 12.98
  public static readonly DEFAULT_CURL_NOISE_TIME_SCALE = 2.24
  public static readonly DEFAULT_CURL_NOISE_STRENGTH = 0.1
  public verticesArray: Float32Array
  public verticesTexture: DataTexture
  public randomArray: Float32Array
  public randomTexture: DataTexture
  private scene: Scene
  private camera: OrthographicCamera
  private renderTarget1: WebGLRenderTarget
  private renderTarget2: WebGLRenderTarget
  private geometry: PlaneGeometry
  private mesh: Mesh

  constructor(count: number, size: number, gl: WebGLRenderer) {
    super({
      fragmentShader: shaders.frag,
      vertexShader: shaders.vert,
      uniforms: {
        tOrigin: new Uniform(null),
        tInput: new Uniform(null),
        tRandom: new Uniform(null),
        uSize: new Uniform(size),
        uCount: new Uniform(count),
        uForceDir: new Uniform(FalloutSimulation.DEFAULT_FORCE_DIR.clone()),
        uForceScale: new Uniform(FalloutSimulation.DEFAULT_FORCE_SCALE),
        uCurlNoiseScale: new Uniform(FalloutSimulation.DEFAULT_CURL_NOISE_SCALE),
        uCurlNoiseTimeScale: new Uniform(FalloutSimulation.DEFAULT_CURL_NOISE_TIME_SCALE),
        uCurlNoiseStrength: new Uniform(FalloutSimulation.DEFAULT_CURL_NOISE_STRENGTH),
      },
    })

    this.verticesArray = FalloutSimulation.createVerticesArray(this.count, this.size)
    this.verticesTexture = createDataTexture(this.verticesArray, this.size)
    this.origin = this.verticesTexture
    this.input = this.verticesTexture
    this.randomArray = FalloutSimulation.createRandomArray(this.count, this.size)
    this.randomTexture = createDataTexture(this.randomArray, this.size)
    this.random = this.randomTexture

    this.scene = new Scene()
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
    this.camera.position.set(0, 0, 0.5)
    this.camera.lookAt(0, 0, 0)
    this.renderTarget1 = createRenderTarget(this.size)
    this.renderTarget2 = createRenderTarget(this.size)
    this.geometry = new PlaneGeometry(2, 2)
    this.mesh = new Mesh(this.geometry, this)
    this.scene.add(this.mesh)

    gl.setRenderTarget(this.renderTarget1)
    gl.render(this.scene, this.camera)
    gl.setRenderTarget(this.renderTarget2)
    gl.render(this.scene, this.camera)
    gl.setRenderTarget(null)
  }

  get origin() {
    return this.uniforms.tOrigin.value
  }
  set origin(v: Texture | null) {
    this.uniforms.tOrigin.value = v
  }

  get input() {
    return this.uniforms.tInput.value
  }
  set input(v: Texture | null) {
    this.uniforms.tInput.value = v
  }

  get random() {
    return this.uniforms.tRandom.value
  }
  set random(v: Texture | null) {
    this.uniforms.tRandom.value = v
  }

  get size() {
    return this.uniforms.uSize.value
  }
  set size(v: number) {
    this.uniforms.uSize.value = v
  }

  get count() {
    return this.uniforms.uCount.value
  }
  set count(v: number) {
    this.uniforms.uCount.value = v
  }

  get forceDir() {
    return this.uniforms.uForceDir.value
  }
  set forceDir(v: Vector3) {
    this.uniforms.uForceDir.value.copy(v)
  }

  get forceScale() {
    return this.uniforms.uForceScale.value
  }
  set forceScale(v: number) {
    this.uniforms.uForceScale.value = v
  }

  get curlNoiseScale() {
    return this.uniforms.uCurlNoiseScale.value
  }
  set curlNoiseScale(v: number) {
    this.uniforms.uCurlNoiseScale.value = v
  }

  get curlNoiseTimeScale() {
    return this.uniforms.uCurlNoiseTimeScale.value
  }
  set curlNoiseTimeScale(v: number) {
    this.uniforms.uCurlNoiseTimeScale.value = v
  }

  get curlNoiseStrength() {
    return this.uniforms.uCurlNoiseStrength.value
  }
  set curlNoiseStrength(v: number) {
    this.uniforms.uCurlNoiseStrength.value = v
  }

  public dispose() {
    super.dispose()
    this.verticesTexture.dispose()
    this.verticesArray = new Float32Array(0)
    this.randomTexture.dispose()
    this.randomArray = new Float32Array(0)
    this.renderTarget1.dispose()
    this.renderTarget2.dispose()
    this.geometry.dispose()
    this.scene.clear()
  }

  public frame(gl: WebGLRenderer) {
    this.input = this.renderTarget2.texture
    const texture = this.renderTarget1.texture
    gl.setRenderTarget(this.renderTarget1)
    gl.render(this.scene, this.camera)
    gl.setRenderTarget(null)

    const temp = this.renderTarget1
    this.renderTarget1 = this.renderTarget2
    this.renderTarget2 = temp

    return texture
  }

  private static createVerticesArray(count: number, size: number) {
    const arr = new Float32Array(size * size * 4)
    for (let i = 0; i < count; i++) {
      arr[4 * i + 0] = random(-1, 1, 10)
      arr[4 * i + 1] = random(-1, 1, 10)
      arr[4 * i + 2] = random(-1, 1, 10)
      arr[4 * i + 3] = 1
    }
    return arr
  }

  private static createRandomArray(count: number, size: number) {
    const arr = new Float32Array(size * size * 4)
    for (let i = 0; i < count; i++) {
      arr[4 * i + 0] = random(0, 1, 10)
      arr[4 * i + 1] = random(0, 1, 10)
      arr[4 * i + 2] = random(0, 1, 10)
      arr[4 * i + 3] = random(0, 1, 10)
    }
    return arr
  }
}

export default FalloutSimulation

import type { Uniform, WebGLRenderer, WebGLRenderTarget } from 'three'
import { Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial } from 'three'

export interface FluidSceneArgs {
  vertexShader: string
  fragmentShader: string
  uniforms: Record<string, Uniform>
}

class FluidScene {
  public uniforms: Record<string, Uniform>
  private scene: Scene
  private camera: OrthographicCamera
  private material: ShaderMaterial
  private geometry: PlaneGeometry
  private mesh: Mesh

  constructor(args: FluidSceneArgs) {
    this.uniforms = args.uniforms

    this.scene = new Scene()
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
    this.camera.position.set(0, 0, 0.5)
    this.camera.lookAt(0, 0, 0)

    this.material = new ShaderMaterial({
      vertexShader: args.vertexShader,
      fragmentShader: args.fragmentShader,
      uniforms: args.uniforms,
      depthWrite: false,
    })
    this.geometry = new PlaneGeometry(2, 2)
    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.matrixAutoUpdate = false
    this.mesh.matrixWorldAutoUpdate = false
    this.scene.add(this.mesh)
  }

  public frame(gl: WebGLRenderer, rt: WebGLRenderTarget) {
    gl.autoClear = false
    gl.setRenderTarget(rt)
    gl.render(this.scene, this.camera)
    gl.setRenderTarget(null)
    gl.autoClear = true
  }
}

export default FluidScene

import { ShaderMaterial } from 'three'
import type { ShaderMaterialParameters } from 'three'
import Shader from './Shader'

class Material extends ShaderMaterial {
  constructor(args?: ShaderMaterialParameters) {
    super(Material.parseArgs(args))
  }

  get time() {
    return this.uniforms.time.value
  }
  set time(v: number) {
    this.uniforms.time.value = v
  }

  get DPR() {
    return this.uniforms.DPR.value
  }
  set DPR(v: number) {
    this.uniforms.DPR.value = v
  }

  private static parseArgs(args?: ShaderMaterialParameters): ShaderMaterialParameters | undefined {
    if (!args) return args
    args.fragmentShader = Shader.extend(args.fragmentShader)
    args.vertexShader = Shader.extend(args.vertexShader)
    args.uniforms = Shader.extendMaterialUniforms(args.uniforms)
    return args
  }
}

export default Material

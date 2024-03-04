import { Effect as EffectImpl } from 'postprocessing'
import type { BlendFunction, EffectAttribute, WebGLExtension } from 'postprocessing'
import type { Uniform, Vector2 } from 'three'
import Shader from './Shader'

export interface EffectCoreOptions {
  vertexShader?: string
  attributes?: EffectAttribute
  blendFunction?: BlendFunction
  defines?: Map<string, string>
  uniforms?: Map<string, Uniform>
  extensions?: Set<WebGLExtension>
}

export interface EffectCoreArgs extends EffectCoreOptions {
  name: string
  fragmentShader: string
}

class Effect extends EffectImpl {
  constructor(args: EffectCoreArgs) {
    super(...Effect.extendArgs(args))
  }

  get time() {
    return this.uniforms.get('time')!.value
  }
  set time(v: number) {
    this.uniforms.get('time')!.value = v
  }

  get resolution() {
    return this.uniforms.get('resolution')!.value
  }
  set resolution(v: Vector2) {
    this.uniforms.get('resolution')!.value.copy(v)
  }

  get DPR() {
    return this.uniforms.get('DPR')!.value
  }
  set DPR(v: number) {
    this.uniforms.get('DPR')!.value = v
  }

  private static extendArgs(args: EffectCoreArgs) {
    args.fragmentShader = Shader.extend(args.fragmentShader)!
    args.vertexShader = Shader.extend(args.vertexShader)
    args.uniforms = Shader.extendEffectUniforms(args.uniforms)

    return [args.name, args.fragmentShader, args] as const
  }
}

export default Effect

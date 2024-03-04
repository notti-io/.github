import { Uniform } from 'three'
import type { IUniform } from 'three'
import shaderUtils from '@/utils/shader'

export type MaterialUniforms = Record<string, IUniform>
export type EffectUniforms = Map<string, Uniform>

class Shader {
  private static readonly SHARED_UNIFORMS = {
    time: new Uniform(0),
    DPR: new Uniform(window.devicePixelRatio),
  }

  public static updateSharedUniforms(time: number, DPR?: number) {
    Shader.SHARED_UNIFORMS.time.value = time
    Shader.SHARED_UNIFORMS.DPR.value = DPR ?? window.devicePixelRatio
  }

  public static extend(shader?: string): string | undefined {
    if (!shader) return shader
    for (const [key, value] of Object.entries(Shader.SHARED_UNIFORMS)) {
      let type: string | null = null
      if (typeof value.value === 'number') type = 'float'
      if (typeof value.value === 'boolean') type = 'bool'
      const uniform = `uniform ${type} ${key};`
      if (!shader.includes(uniform)) {
        shader = `${uniform}\n${shader}`
      }
    }
    if (!shader.includes('#import')) return shader
    shader = shader.replace(/# import/g, '#import')
    while (shader.includes('#import')) {
      let name: string = shader.split('#import{')[1].split('};')[0]
      name = name.replace(/ /g, '')
      if (!shaderUtils[name]) throw 'Shader imported ' + name + ', but not found in compiled shaders.\n' + shader
      shader = shader.replace('#import{' + name + '};', shaderUtils[name])
    }
    return shader
  }

  public static extendMaterialUniforms(uniforms?: MaterialUniforms): MaterialUniforms {
    if (!uniforms) return Shader.SHARED_UNIFORMS
    for (const [key, value] of Object.entries(Shader.SHARED_UNIFORMS)) {
      if (!uniforms[key]) {
        uniforms[key] = value
      }
    }
    return uniforms
  }

  public static extendEffectUniforms(uniforms?: EffectUniforms): EffectUniforms {
    if (!uniforms) uniforms = new Map<string, Uniform>()
    for (const [key, value] of Object.entries(Shader.SHARED_UNIFORMS)) {
      if (!uniforms.has(key)) {
        uniforms.set(key, value)
      }
    }
    return uniforms
  }
}

export default Shader

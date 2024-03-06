import { Size } from '@react-three/fiber'
import gsap from 'gsap'
import { Color, Uniform, Vector2 } from 'three'
import type { IUniform } from 'three'
import shaderUtils from '@/utils/shader'

export type MaterialUniforms = Record<string, IUniform>
export type EffectUniforms = Map<string, Uniform>

class Shader {
  private static readonly ACCENT_COLOR = { color: '#ffffff' }
  private static readonly SHARED_UNIFORMS = {
    time: new Uniform(0),
    resolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
    DPR: new Uniform(window.devicePixelRatio),
    audioFrequency: new Uniform(0),
    accentColor: new Uniform(new Color('#ffffff')),
  }

  public static getAccentColor() {
    return Shader.ACCENT_COLOR.color
  }

  public static updateSharedUniforms(time: number, size: Size, DPR?: number) {
    Shader.SHARED_UNIFORMS.time.value = time
    Shader.SHARED_UNIFORMS.resolution.value.set(size.width, size.height)
    Shader.SHARED_UNIFORMS.DPR.value = DPR ?? window.devicePixelRatio
  }

  public static updateAudioFrequency(frequency: number) {
    Shader.SHARED_UNIFORMS.audioFrequency.value = frequency
  }

  public static updatedAccentColor(color: string) {
    Shader.ACCENT_COLOR.color = color
    Shader.SHARED_UNIFORMS.accentColor.value.set(color)
  }

  public static translateAccentColor(color: string) {
    gsap.to(Shader.ACCENT_COLOR, {
      color,
      ease: 'sine.inOut',
      duration: 1,
      onUpdate: () => {
        Shader.SHARED_UNIFORMS.accentColor.value.set(Shader.ACCENT_COLOR.color)
      },
    })
  }

  public static extend(shader?: string): string | undefined {
    if (!shader) return shader
    for (const [key, value] of Object.entries(Shader.SHARED_UNIFORMS)) {
      let type: string | null = null
      if (typeof value.value === 'number') type = 'float'
      if (typeof value.value === 'boolean') type = 'bool'
      if (value.value instanceof Vector2) type = 'vec2'
      if (value.value instanceof Color) type = 'vec3'
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

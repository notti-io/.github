import { extend } from '@react-three/fiber'
import type { Object3DNode } from '@react-three/fiber'
import { BlendFunction } from 'postprocessing'
import { Uniform } from 'three'
import Effect from '@/api/Effect'
import fragmentShader from './shader.frag?raw'

class GlowEffect extends Effect {
  public static readonly DEFAULT_PHONE = 0
  public static readonly DEFAULT_BLEND_FUNCTION = BlendFunction.SCREEN

  constructor(blendFunction = GlowEffect.DEFAULT_BLEND_FUNCTION) {
    super({
      name: 'Glow',
      fragmentShader,
      blendFunction,
      uniforms: new Map<string, Uniform>([['uPhone', new Uniform(GlowEffect.DEFAULT_PHONE)]]),
    })
  }

  get phone() {
    return this.uniforms.get('uPhone')!.value
  }
  set phone(v: number) {
    this.uniforms.get('uPhone')!.value = v
  }
}

extend({ GlowEffect })

declare module '@react-three/fiber' {
  interface ThreeElements {
    glowEffect: Object3DNode<GlowEffect, typeof GlowEffect>
  }
}

export default GlowEffect

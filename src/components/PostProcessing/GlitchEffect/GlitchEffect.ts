import { extend } from '@react-three/fiber'
import type { Object3DNode } from '@react-three/fiber'
import gsap from 'gsap'
import { BlendFunction } from 'postprocessing'
import { Uniform } from 'three'
import type { Texture } from 'three'
import Effect from '@/api/Effect'
import fragmentShader from './shader.frag?raw'

class GlitchEffect extends Effect {
  public static readonly DEFAULT_PROGRESS = 0
  public static readonly DEFAULT_SCALE = 3.3
  public static readonly DEFAULT_DISTORT = 0.55
  public static readonly DEFAULT_BLEND_FUNCTION = BlendFunction.NORMAL

  constructor(blendFunction = GlitchEffect.DEFAULT_BLEND_FUNCTION) {
    super({
      name: 'Glitch',
      fragmentShader,
      blendFunction,
      uniforms: new Map<string, Uniform>([
        ['tMap', new Uniform(null)],
        ['tFluid', new Uniform(null)],
        ['tFluidMask', new Uniform(null)],
        ['uProgress', new Uniform(GlitchEffect.DEFAULT_PROGRESS)],
        ['uScale', new Uniform(GlitchEffect.DEFAULT_SCALE)],
        ['uDistort', new Uniform(GlitchEffect.DEFAULT_DISTORT)],
      ]),
    })
  }

  get map() {
    return this.uniforms.get('tMap')!.value
  }
  set map(v: Texture | null) {
    this.uniforms.get('tMap')!.value = v
  }

  get fluid() {
    return this.uniforms.get('tFluid')!.value
  }
  set fluid(v: Texture | null) {
    this.uniforms.get('tFluid')!.value = v
  }

  get fluidMask() {
    return this.uniforms.get('tFluidMask')!.value
  }
  set fluidMask(v: Texture | null) {
    this.uniforms.get('tFluidMask')!.value = v
  }

  get progress() {
    return this.uniforms.get('uProgress')!.value
  }
  set progress(v: number) {
    this.uniforms.get('uProgress')!.value = v
  }

  get scale() {
    return this.uniforms.get('uScale')!.value
  }
  set scale(v: number) {
    this.uniforms.get('uScale')!.value = v
  }

  get distort() {
    return this.uniforms.get('uDistort')!.value
  }
  set distort(v: number) {
    this.uniforms.get('uDistort')!.value = v
  }

  public translateProgress(progress: number) {
    if (this.progress === progress) return
    gsap.to(this, { progress, ease: 'sine.inOut', duration: 1.3 })
  }
}

extend({ GlitchEffect })

declare module '@react-three/fiber' {
  interface ThreeElements {
    glitchEffect: Object3DNode<GlitchEffect, typeof GlitchEffect>
  }
}

export default GlitchEffect

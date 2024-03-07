import { extend } from '@react-three/fiber'
import type { Object3DNode } from '@react-three/fiber'
import { Color, Uniform } from 'three'
import type { ColorRepresentation } from 'three'
import Material from '@/api/Material'
import shaders from './shaders'

class ScreenMaterial extends Material {
  public static readonly DEFAULT_SPEED = 0.2
  public static readonly DEFAULT_LINE_WIDTH = 0.55
  public static readonly DEFAULT_WOBBLE = 0
  public static readonly DEFAULT_WOBBLE_TIME_SCALE = 1
  public static readonly DEFAULT_SECONDARY_COLOR = '#000000'

  constructor() {
    super({
      fragmentShader: shaders.frag,
      vertexShader: shaders.vert,
      uniforms: {
        uSpeed: new Uniform(ScreenMaterial.DEFAULT_SPEED),
        uLineWidth: new Uniform(ScreenMaterial.DEFAULT_LINE_WIDTH),
        uWobble: new Uniform(ScreenMaterial.DEFAULT_WOBBLE),
        uWobbleTimeScale: new Uniform(ScreenMaterial.DEFAULT_WOBBLE_TIME_SCALE),
        uSecondaryColor: new Uniform(new Color(ScreenMaterial.DEFAULT_SECONDARY_COLOR)),
      },
    })
  }

  get speed() {
    return this.uniforms.uSpeed.value
  }
  set speed(v: number) {
    this.uniforms.uSpeed.value = v
  }

  get lineWidth() {
    return this.uniforms.uLineWidth.value
  }
  set lineWidth(v: number) {
    this.uniforms.uLineWidth.value = v
  }

  get wobble() {
    return this.uniforms.uWobble.value
  }
  set wobble(v: number) {
    this.uniforms.uWobble.value = v
  }

  get wobbleTimeScale() {
    return this.uniforms.uWobbleTimeScale.value
  }
  set wobbleTimeScale(v: number) {
    this.uniforms.uWobbleTimeScale.value = v
  }

  get secondaryColor() {
    return this.uniforms.uSecondaryColor.value
  }
  set secondaryColor(v: ColorRepresentation) {
    this.uniforms.uSecondaryColor.value.set(v)
  }
}

extend({ ScreenMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    screenMaterial: Object3DNode<ScreenMaterial, typeof ScreenMaterial>
  }
}

export default ScreenMaterial

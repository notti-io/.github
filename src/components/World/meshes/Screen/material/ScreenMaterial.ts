import { extend } from '@react-three/fiber'
import type { Object3DNode } from '@react-three/fiber'
import { Color, Uniform } from 'three'
import type { ColorRepresentation } from 'three'
import Material from '@/api/Material'
import { initialAccentColor } from '@/api/store'
import shaders from './shaders'

class ScreenMaterial extends Material {
  public static readonly DEFAULT_SPEED = 0.2
  public static readonly DEFAULT_LINE_WIDTH = 0.35
  public static readonly DEFAULT_WOBBLE = 0
  public static readonly DEFAULT_WOBBLE_TIME_SCALE = 1
  public static readonly DEFAULT_COLOR_1 = initialAccentColor
  public static readonly DEFAULT_COLOR_2 = '#000000'

  constructor() {
    super({
      fragmentShader: shaders.frag,
      vertexShader: shaders.vert,
      uniforms: {
        uSpeed: new Uniform(ScreenMaterial.DEFAULT_SPEED),
        uLineWidth: new Uniform(ScreenMaterial.DEFAULT_LINE_WIDTH),
        uWobble: new Uniform(ScreenMaterial.DEFAULT_WOBBLE),
        uWobbleTimeScale: new Uniform(ScreenMaterial.DEFAULT_WOBBLE_TIME_SCALE),
        uColor1: new Uniform(new Color(ScreenMaterial.DEFAULT_COLOR_1)),
        uColor2: new Uniform(new Color(ScreenMaterial.DEFAULT_COLOR_2)),
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

  get color1() {
    return this.uniforms.uColor1.value
  }
  set color1(v: ColorRepresentation) {
    this.uniforms.uColor1.value.set(v)
  }

  get color2() {
    return this.uniforms.uColor2.value
  }
  set color2(v: ColorRepresentation) {
    this.uniforms.uColor2.value.set(v)
  }
}

extend({ ScreenMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    screenMaterial: Object3DNode<ScreenMaterial, typeof ScreenMaterial>
  }
}

export default ScreenMaterial

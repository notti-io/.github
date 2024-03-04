import { extend } from '@react-three/fiber'
import type { Object3DNode } from '@react-three/fiber'
import { AdditiveBlending, Color, Uniform } from 'three'
import type { ColorRepresentation, Texture } from 'three'
import Material from '@/api/Material'
import { initialAccentColor } from '@/api/store'
import shaders from './shaders'

class FalloutMaterial extends Material {
  public static readonly DEFAULT_SIZE = 0.61
  public static readonly DEFAULT_COLOR = initialAccentColor
  public static readonly DEFAULT_ALPHA = 0.38

  constructor() {
    super({
      fragmentShader: shaders.frag,
      vertexShader: shaders.vert,
      uniforms: {
        tMap: new Uniform(null),
        uSize: new Uniform(FalloutMaterial.DEFAULT_SIZE),
        uColor: new Uniform(new Color(FalloutMaterial.DEFAULT_COLOR)),
        uAlpha: new Uniform(FalloutMaterial.DEFAULT_ALPHA),
        uRotation: new Uniform(0),
      },
      depthTest: true,
      depthWrite: false,
      transparent: true,
      blending: AdditiveBlending,
    })
  }

  get map() {
    return this.uniforms.tMap.value
  }
  set map(v: Texture | null) {
    this.uniforms.tMap.value = v
  }

  get size() {
    return this.uniforms.uSize.value
  }
  set size(v: number) {
    this.uniforms.uSize.value = v
  }

  get color() {
    return this.uniforms.uColor.value
  }
  set color(v: ColorRepresentation) {
    this.uniforms.uColor.value.set(v)
  }

  get alpha() {
    return this.uniforms.uAlpha.value
  }
  set alpha(v: number) {
    this.uniforms.uAlpha.value = v
  }

  get rotation() {
    return this.uniforms.uRotation.value
  }
  set rotation(v: number) {
    this.uniforms.uRotation.value = v
  }
}

extend({ FalloutMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    falloutMaterial: Object3DNode<FalloutMaterial, typeof FalloutMaterial>
  }
}

export default FalloutMaterial

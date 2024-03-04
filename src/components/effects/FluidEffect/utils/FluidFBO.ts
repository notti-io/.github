import { RGBAFormat, WebGLRenderTarget } from 'three'
import type { LinearFilter, NearestFilter } from 'three'
import { getFloatType } from '@/utils/helpers'

export interface FluidFBOArgs {
  size: number
  filter: typeof LinearFilter | typeof NearestFilter
}

class FluidFBO {
  private fbo1: WebGLRenderTarget
  private fbo2: WebGLRenderTarget
  public fbo: WebGLRenderTarget

  constructor(args: FluidFBOArgs) {
    this.fbo1 = FluidFBO.createFBO(args)
    this.fbo2 = FluidFBO.createFBO(args)
    this.fbo = this.fbo1
  }

  get read() {
    return this.fbo1.texture
  }

  get write() {
    return this.fbo2
  }

  public swap() {
    const temp = this.fbo1
    this.fbo1 = this.fbo2
    this.fbo2 = temp
  }

  private static createFBO(args: FluidFBOArgs) {
    return new WebGLRenderTarget(args.size, args.size, {
      minFilter: args.filter,
      magFilter: args.filter,
      format: RGBAFormat,
      type: getFloatType(),
      generateMipmaps: false,
      depthBuffer: false,
    })
  }
}

export default FluidFBO

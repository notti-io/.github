import { MathUtils, Vector2 } from 'three'
import type Pointer from '@/api/Pointer'
import { isMobile } from '@/utils/helpers'

class FluidMouse {
  public static readonly DEFAULT_SCALE_BASED_ON_VELOCITY = true
  public static readonly DEFAULT_SCALE = 1

  public scaleBasedOnVelocity: boolean
  public scale: number

  private pointer: Pointer
  private mouse: Vector2
  private last: Vector2
  private currentScale: number

  constructor(pointer: Pointer) {
    this.scaleBasedOnVelocity = FluidMouse.DEFAULT_SCALE_BASED_ON_VELOCITY
    this.scale = FluidMouse.DEFAULT_SCALE

    this.pointer = pointer
    this.mouse = new Vector2(this.pointer.baseX, this.pointer.baseY)
    this.last = new Vector2(this.pointer.baseX, this.pointer.baseY)
    this.currentScale = 1
  }

  public frame() {
    this.currentScale += 0.05 * (this.scale - this.currentScale)
    this.mouse.set(this.pointer.baseX, this.pointer.baseY)
    const length = this.mouse.distanceTo(this.last)
    const mappedSize = this.scaleBasedOnVelocity ? MathUtils.mapLinear(length, 0, 5, 10, 60) : 25
    const clampedSize = MathUtils.clamp(mappedSize, 10, 60)
    const mappedDelta = MathUtils.mapLinear(length, 0, 15, 0, 10)
    const clampedDelta = MathUtils.clamp(mappedDelta, 0, 10)
    let args
    if (length > 0.01) {
      args = {
        x: this.mouse.x,
        y: this.mouse.y,
        dx: (this.mouse.x - this.last.x) * clampedDelta,
        dy: (this.mouse.y - this.last.y) * clampedDelta,
        color: '#ffffff',
        radius: clampedSize * this.currentScale * 0.7 * (isMobile() ? 0.5 : 1),
      }
    }
    this.last.copy(this.mouse)
    return args
  }
}

export default FluidMouse

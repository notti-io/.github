import { Vector2 } from 'three'

class Pointer {
  private base: Vector2
  private vector: Vector2
  public isMoved: boolean

  constructor() {
    this.base = new Vector2(0, 0)
    this.vector = new Vector2(-1, 1)
    this.isMoved = false
    this.set(window.innerWidth / 2, window.innerHeight / 2)
  }

  get baseX() {
    return this.base.x
  }

  get baseY() {
    return this.base.y
  }

  get x() {
    return this.vector.x
  }

  get y() {
    return this.vector.y
  }

  public set(x: number, y: number) {
    const { innerWidth, innerHeight } = window || { innerWidth: 0, innerHeight: 0 }
    this.isMoved = true
    this.base.set(x, y)
    this.vector.set((x / innerWidth) * 2 - 1, -(y / innerHeight) * 2 + 1)
  }
}

export default Pointer

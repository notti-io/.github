import { extend } from '@react-three/fiber'
import type { Object3DNode } from '@react-three/fiber'
import { BufferAttribute, BufferGeometry } from 'three'
import type { Points, Vector3, WebGLRenderer } from 'three'
import FalloutSimulation from './FalloutSimulation'
import FalloutMaterial from '../material/FalloutMaterial'

class FalloutGeometry extends BufferGeometry {
  public static readonly DEFAULT_COUNT = 16000
  private count: number
  private size: number
  private positionArray: Float32Array
  private simulation: FalloutSimulation

  constructor(gl: WebGLRenderer, count = FalloutGeometry.DEFAULT_COUNT) {
    super()
    this.count = count
    this.size = FalloutGeometry.findSize(this.count)
    this.drawRange.start = 0
    this.drawRange.count = this.count

    this.positionArray = FalloutGeometry.createPositionArray(this.count, this.size)
    this.setAttribute('position', new BufferAttribute(this.positionArray, 3))

    this.simulation = new FalloutSimulation(this.count, this.size, gl)
    this.setAttribute('random', new BufferAttribute(this.simulation.randomArray, 4))
  }

  get forceDir() {
    return this.simulation.forceDir
  }
  set forceDir(v: Vector3) {
    this.simulation.forceDir = v
  }

  get forceScale() {
    return this.simulation.forceScale
  }
  set forceScale(v: number) {
    this.simulation.forceScale = v
  }

  get curlNoiseScale() {
    return this.simulation.curlNoiseScale
  }
  set curlNoiseScale(v: number) {
    this.simulation.curlNoiseScale = v
  }

  get curlNoiseTimeScale() {
    return this.simulation.curlNoiseTimeScale
  }
  set curlNoiseTimeScale(v: number) {
    this.simulation.curlNoiseTimeScale = v
  }

  get curlNoiseStrength() {
    return this.simulation.curlNoiseStrength
  }
  set curlNoiseStrength(v: number) {
    this.simulation.curlNoiseStrength = v
  }

  public frame(gl: WebGLRenderer) {
    const tPos = this.simulation.frame(gl)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this as any).__r3f) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const points = (this as any).__r3f.parent as Points
      if (points) {
        const material = points.material as FalloutMaterial
        if (material) {
          material.pos = tPos
        }
      }
    }
  }

  public dispose() {
    super.dispose()
    this.positionArray = new Float32Array(0)
    this.simulation.dispose()
  }

  private static findSize(particlesCount: number) {
    for (let i = 1; ; i++) {
      const pow2 = Math.pow(2, i)
      if (pow2 * pow2 >= particlesCount) {
        return pow2
      }
    }
  }

  private static createPositionArray(count: number, size: number) {
    const position = new Float32Array(size * size * 3)
    for (let i = 0; i < count; i++) {
      position[3 * i + 0] = (i % size) / size
      position[3 * i + 1] = Math.floor(i / size) / size
      position[3 * i + 2] = i
    }
    return position
  }
}

extend({ FalloutGeometry })

declare module '@react-three/fiber' {
  interface ThreeElements {
    falloutGeometry: Object3DNode<FalloutGeometry, typeof FalloutGeometry>
  }
}

export default FalloutGeometry

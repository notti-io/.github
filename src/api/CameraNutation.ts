import type { Size } from '@react-three/fiber'
import gsap from 'gsap'
import { MathUtils, Vector2, Vector3 } from 'three'
import type { Object3D, Camera } from 'three'
import Pointer from './Pointer'

export interface CameraNutationMovement {
  value: Vector2
  offset: Vector2
  lerp: number
}

export interface CameraNutationRotation {
  value: number
  delta: number
  lerp: number
}

export interface CameraNutationConfig {
  movementX?: number
  movementY?: number
  movementLerp?: number
  rotationDelta?: number
  rotationLerp?: number
}

export interface CameraNutationOptions {
  enabled?: boolean
  world?: Object3D | null
  position?: Vector3
  lookAt?: Vector3
  strength?: number
  config?: CameraNutationConfig
}

class CameraNutation {
  public static readonly MOVEMENT_X = 3
  public static readonly MOVEMENT_Y = 0.2
  public static readonly MOVEMENT_LERP = 0.04
  public static readonly ROTATION_DELTA = 10
  public static readonly ROTATION_LERP = 0.6
  private static readonly TWEEN = { ease: 'sine.inOut', duration: 1 }

  private enabled: boolean
  private world?: Object3D | null
  private position: Vector3
  private lookAt: Vector3
  private pointer: Vector2
  private strength: number
  private movement: CameraNutationMovement
  private rotation: CameraNutationRotation

  constructor(options: CameraNutationOptions = {}) {
    this.enabled = options.enabled ?? true
    this.world = options.world
    this.position = options.position ?? new Vector3(0, 0, 5)
    this.lookAt = options.lookAt ?? new Vector3()
    this.pointer = new Vector2()
    this.strength = options.strength ?? 1
    this.movement = {
      value: new Vector2(),
      offset: new Vector2(CameraNutation.MOVEMENT_X, CameraNutation.MOVEMENT_Y),
      lerp: CameraNutation.MOVEMENT_LERP,
    }
    this.rotation = {
      value: 0,
      delta: CameraNutation.ROTATION_DELTA,
      lerp: CameraNutation.ROTATION_LERP,
    }
    this.setConfig(options.config ?? {})
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  public setWorld(world?: Object3D | null) {
    this.world = world
  }

  public setConfig(config: CameraNutationConfig) {
    if (typeof config.movementX === 'number') {
      this.movement.offset.x = config.movementX
    }
    if (typeof config.movementY === 'number') {
      this.movement.offset.y = config.movementY
    }
    if (typeof config.movementLerp === 'number') {
      this.movement.lerp = config.movementLerp
    }
    if (typeof config.rotationDelta === 'number') {
      this.rotation.delta = config.rotationDelta
    }
    if (typeof config.rotationLerp === 'number') {
      this.rotation.lerp = config.rotationLerp
    }
  }

  public translateStrength(value: number) {
    if (this.strength === value) return
    gsap.to(this, {
      strength: value,
      ...CameraNutation.TWEEN,
    })
  }

  public translatePosition(value: Vector3) {
    gsap.to(this.position, {
      x: value.x,
      y: value.y,
      z: value.z,
      ...CameraNutation.TWEEN,
    })
  }

  public translateLookAt(value: Vector3) {
    gsap.to(this.lookAt, {
      x: value.x,
      y: value.y,
      z: value.z,
      ...CameraNutation.TWEEN,
    })
  }

  private updatePointer(size: Size, pointer: Pointer) {
    const nextPointerX = MathUtils.mapLinear(pointer.x, -1, 1, 0, size.width)
    const nextPointerY = MathUtils.mapLinear(pointer.y, -1, 1, 0, size.height)
    const nextPointer = new Vector2(nextPointerX, nextPointerY)
    const deltaPointer = nextPointer.clone().sub(this.pointer)
    this.pointer.copy(nextPointer)
    return deltaPointer
  }

  private updateMovement(pointer: Pointer) {
    const nextNutationX = pointer.x * this.movement.offset.x * this.strength
    const nextNutationY = pointer.y * this.movement.offset.y * this.strength
    const nextNutation = new Vector2(nextNutationX, nextNutationY)
    this.movement.value.lerp(nextNutation, this.movement.lerp)
  }

  private updateRotation(deltaPointer: Vector2, size: Size) {
    const deltaPointerX = Math.abs(deltaPointer.x) / size.width
    const mappedDeltaPointerX = MathUtils.mapLinear(deltaPointerX, 0, 0.02, 0, 1)
    const clampedDeltaPointerX = MathUtils.clamp(mappedDeltaPointerX, 0, 1)

    const rotationStrength = clampedDeltaPointerX * this.movement.offset.x * this.strength
    const rotationRad = MathUtils.degToRad(this.rotation.delta)
    const nextRotation = rotationRad * rotationStrength * Math.sign(deltaPointer.x)
    const nextRotationLerp = 0.02 * this.rotation.lerp
    this.rotation.value = MathUtils.lerp(this.rotation.value, nextRotation, nextRotationLerp)
  }

  public frame(camera: Camera, size: Size, pointer: Pointer) {
    if (!this.enabled) return

    const nextPosition = this.position.clone()
    const nextLookAt = this.lookAt.clone()

    this.updateMovement(pointer)
    nextPosition.x += this.movement.value.x * this.strength
    nextPosition.y += this.movement.value.y * this.strength

    this.updateRotation(this.updatePointer(size, pointer), size)
    const worldRotation = this.rotation.value * this.strength
    const worldRotationLerp = 0.07 * this.rotation.lerp
    if (this.world) {
      this.world.rotation.z = MathUtils.lerp(this.world.rotation.z, worldRotation, worldRotationLerp)
    }

    camera.position.copy(nextPosition)
    camera.lookAt(nextLookAt)
  }
}

export default CameraNutation

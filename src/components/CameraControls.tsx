import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useMemo, useRef } from 'react'
import type { Object3D } from 'three'
import CameraNutation from '@/api/CameraNutation'
import Controls from '@/api/Controls'
import useStore from '@/api/store'
import { useFrame } from '@react-three/fiber'

const controls = Controls.create('Camera', {
  isOrbitControls: Controls.bool(false),
})
const nutationControls = Controls.folder('Camera', 'Nutation', {
  movementX: Controls.num(CameraNutation.MOVEMENT_X, 0, 10),
  movementY: Controls.num(CameraNutation.MOVEMENT_Y, 0, 10),
  movementLerp: Controls.num(CameraNutation.MOVEMENT_LERP),
  rotationDelta: Controls.num(CameraNutation.ROTATION_DELTA, -10, 10),
  rotationLerp: Controls.num(CameraNutation.ROTATION_LERP),
})

function CameraControls() {
  const { isOrbitControls } = useControls(...controls.get())
  const config = useControls(...nutationControls.get())
  const world: Object3D | null = null
  const isPointerTouch = useStore(state => state.isPointerTouch)
  const isPointerOut = useStore(state => state.isPointerOut)
  const pointer = useStore(state => state.pointer)
  const strength = useMemo(() => Number(!isPointerTouch && !isPointerOut), [isPointerTouch, isPointerOut])
  const nutation = useRef(
    new CameraNutation({
      enabled: !isOrbitControls,
      world,
      strength,
      config,
    }),
  )

  useEffect(() => nutation.current.setEnabled(!isOrbitControls), [isOrbitControls])
  useEffect(() => nutation.current.setWorld(world), [world])
  useEffect(() => nutation.current.setConfig(config), [config])
  useEffect(() => nutation.current.translateStrength(strength), [strength])
  useFrame(({ camera, size }) => nutation.current.frame(camera, size, pointer))

  return <OrbitControls enableDamping enabled={isOrbitControls} />
}

export default CameraControls

import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
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
  const world = useStore(state => state.world)
  const isPointerTouch = useStore(state => state.isPointerTouch)
  const pointer = useStore(state => state.pointer)
  const nutation = useRef(
    new CameraNutation({
      enabled: !isOrbitControls,
      world,
      strength: Number(!isPointerTouch),
      config,
    }),
  )

  useEffect(() => nutation.current.setEnabled(!isOrbitControls), [isOrbitControls])
  useEffect(() => nutation.current.setWorld(world), [world])
  useEffect(() => nutation.current.setConfig(config), [config])
  useEffect(() => nutation.current.translateStrength(Number(!isPointerTouch)), [isPointerTouch])
  useFrame(({ camera, size }) => nutation.current.frame(camera, size, pointer))

  return <OrbitControls enableDamping enabled={isOrbitControls} />
}

export default CameraControls

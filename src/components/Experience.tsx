import { Canvas } from '@react-three/fiber'
import Performance from './Performance'
import CameraControls from './CameraControls'
import World from './World'

function Experience() {
  return (
    <Canvas flat id='experience' camera={{ fov: 35, near: 0.1, far: 500 }}>
      <Performance />
      <CameraControls />
      <World />
    </Canvas>
  )
}

export default Experience

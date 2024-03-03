import { Canvas } from '@react-three/fiber'
import Performance from './Performance'
import CameraControls from './CameraControls'

function Experience() {
  return (
    <Canvas flat id='experience' camera={{ fov: 35, near: 0.1, far: 500 }}>
      <Performance />
      <CameraControls />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color='red' />
      </mesh>
    </Canvas>
  )
}

export default Experience

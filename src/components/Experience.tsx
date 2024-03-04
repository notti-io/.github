import { Canvas } from '@react-three/fiber'
import CameraControls from './CameraControls'
import Performance from './Performance'
import ShadersProvider from './ShadersProvider'
import World from './World'
import PostProcessing from './PostProcessing'

function Experience() {
  return (
    <Canvas flat id='experience' camera={{ fov: 35, near: 0.1, far: 500 }}>
      <ShadersProvider>
        <Performance />
        <CameraControls />
        <World />
        <PostProcessing />
      </ShadersProvider>
    </Canvas>
  )
}

export default Experience

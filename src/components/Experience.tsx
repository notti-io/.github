import { Canvas } from '@react-three/fiber'

function Experience() {
  return (
    <Canvas flat id='experience' camera={{ fov: 35, near: 0.1, far: 500 }}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color='red' />
      </mesh>
    </Canvas>
  )
}

export default Experience

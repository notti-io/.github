import { useFrame } from '@react-three/fiber'
import type { PropsWithChildren } from 'react'
import Shader from '@/api/Shader'

function ShadersProvider({ children }: PropsWithChildren) {
  useFrame(({ clock, gl }) => {
    const time = clock.getElapsedTime()
    const DPR = gl.getPixelRatio()
    Shader.updateSharedUniforms(time, DPR)
  })

  return children
}

export default ShadersProvider

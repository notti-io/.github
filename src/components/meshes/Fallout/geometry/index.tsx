import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import type { default as Ref } from './FalloutGeometry'
import './FalloutGeometry'

export interface FalloutGeometryProps {
  count?: number
  curlNoiseScale?: number
  curlNoiseTimeScale?: number
  curlNoiseStrength?: number
}

function FalloutGeometry(props: FalloutGeometryProps) {
  const { count, ...restProps } = props
  const ref = useRef<Ref>(null)
  const gl = useThree(state => state.gl)

  useFrame(({ gl }) => {
    if (!ref.current) return
    ref.current.frame(gl)
  })

  return <falloutGeometry ref={ref} args={[gl, count]} {...restProps} />
}

export default FalloutGeometry

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { ColorRepresentation, Object3D, Texture } from 'three'
import { default as Ref } from './FalloutMaterial'

export interface FalloutMaterialProps {
  world?: Object3D | null
  map?: Texture
  size?: number
  color?: ColorRepresentation
  alpha?: number
}

function FalloutMaterial(props: FalloutMaterialProps) {
  const { world, map, size, color, alpha } = props
  const ref = useRef<Ref>(null)

  useFrame(() => {
    if (!ref.current || !world) return
    ref.current.rotation = world.rotation.z
  })

  return <falloutMaterial ref={ref} map={map} size={size} color={color} alpha={alpha} />
}

export default FalloutMaterial

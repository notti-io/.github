import { useThree } from '@react-three/fiber'
import type { GroupProps } from '@react-three/fiber'
import { useMemo } from 'react'
import type { ColorRepresentation, PerspectiveCamera } from 'three'
import { calculateScreenSize } from '@/utils/helpers'
import Screen from './Screen'
import Floor from './Floor'

export interface HeroProps extends GroupProps {
  color?: ColorRepresentation
}

function Hero(props: HeroProps) {
  const { color, name = 'Hero', ...restProps } = props
  const { width, height } = useThree(state => calculateScreenSize(state.camera as PerspectiveCamera, 6))
  const floorY = useMemo(() => -height / 2 - 0.2, [height])

  return (
    <group name={name} {...restProps}>
      <Screen position={[0, 0, -3]} width={width} height={height} color={color} />
      <Floor position={[0, floorY, 0]} />
    </group>
  )
}

export default Hero

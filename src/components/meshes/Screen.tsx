import type { GroupProps } from '@react-three/fiber'
import type { ColorRepresentation } from 'three'

export interface ScreenProps extends GroupProps {
  width: number
  height: number
  color?: ColorRepresentation
}

function Screen(props: ScreenProps) {
  const { name = 'Screen', ...restProps } = props

  return <group name={name} {...restProps}></group>
}

export default Screen

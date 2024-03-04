import type { GroupProps } from '@react-three/fiber'
import { useControls } from 'leva'
import type { ColorRepresentation } from 'three'
import Controls from '@/api/Controls'
import useStore from '@/api/store'

export interface ScreenProps extends GroupProps {
  width: number
  height: number
  color?: ColorRepresentation
}

const controls = Controls.folder('World', 'Screen', {
  lightIntensity: Controls.num(10, 0, 50),
})

function Screen(props: ScreenProps) {
  const { color, width, height, name = 'Screen', ...restProps } = props
  const args = useControls(...controls.get())
  const setScreen = useStore(state => state.setScreen)

  return (
    <group name={name} {...restProps}>
      <mesh ref={setScreen} scale={[width, height, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <rectAreaLight color={color} intensity={args.lightIntensity} width={width} height={height} rotation-y={Math.PI} />
    </group>
  )
}

export default Screen

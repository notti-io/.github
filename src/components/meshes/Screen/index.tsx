import type { GroupProps } from '@react-three/fiber'
import { useControls } from 'leva'
import type { ColorRepresentation } from 'three'
import Controls from '@/api/Controls'
import useStore from '@/api/store'
import ScreenMaterial from './material'
import ScreenMaterialImpl from './material/ScreenMaterial'

export interface ScreenProps extends GroupProps {
  width: number
  height: number
  color?: ColorRepresentation
}

const controls = Controls.folder('World', 'Screen', {
  lightIntensity: Controls.num(10, 0, 50),
  speed: Controls.num(ScreenMaterialImpl.DEFAULT_SPEED),
  lineWidth: Controls.num(ScreenMaterialImpl.DEFAULT_LINE_WIDTH),
  color2: Controls.color(ScreenMaterialImpl.DEFAULT_COLOR_2),
})

function Screen(props: ScreenProps) {
  const { color, width, height, name = 'Screen', ...restProps } = props
  const args = useControls(...controls.get())
  const setScreen = useStore(state => state.setScreen)

  return (
    <group name={name} {...restProps}>
      <mesh ref={setScreen} scale={[width, height, 1]}>
        <planeGeometry args={[1, 1]} />
        <ScreenMaterial speed={args.speed} lineWidth={args.lineWidth} color1={color} color2={args.color2} />
      </mesh>
      <rectAreaLight color={color} intensity={args.lightIntensity} width={width} height={height} rotation-y={Math.PI} />
    </group>
  )
}

export default Screen

import { useFrame } from '@react-three/fiber'
import type { GroupProps } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { RectAreaLight } from 'three'
import Controls from '@/api/Controls'
import useStore from '@/api/store'
import Shader from '@/api/Shader'
import ScreenMaterial from './material'
import ScreenMaterialImpl from './material/ScreenMaterial'

export interface ScreenProps extends GroupProps {
  width: number
  height: number
}

const controls = Controls.folder('World', 'Screen', {
  lightIntensity: Controls.num(10, 0, 50),
  speed: Controls.num(ScreenMaterialImpl.DEFAULT_SPEED),
  lineWidth: Controls.num(ScreenMaterialImpl.DEFAULT_LINE_WIDTH),
  secondaryColor: Controls.color(ScreenMaterialImpl.DEFAULT_SECONDARY_COLOR),
})

function Screen(props: ScreenProps) {
  const { width, height, name = 'Screen', ...restProps } = props
  const rectLightRef = useRef<RectAreaLight>(null)
  const prevAccentColor = useRef<string>('')
  const prevLightIntensity = useRef<number>(-1)
  const args = useControls(...controls.get())
  const setScreen = useStore(state => state.setScreen)

  useFrame(() => {
    if (!rectLightRef.current) return
    const accentColor = Shader.getAccentColor()
    if (prevAccentColor.current !== accentColor) {
      rectLightRef.current.color.set(accentColor)
      prevAccentColor.current = accentColor
    }
    const loader = Shader.getLoader()
    const lightIntensity = args.lightIntensity * loader
    if (prevLightIntensity.current !== lightIntensity) {
      rectLightRef.current.intensity = lightIntensity
      prevLightIntensity.current = lightIntensity
    }
  })

  return (
    <group name={name} {...restProps}>
      <mesh ref={setScreen} scale={[width, height, 1]}>
        <planeGeometry args={[1, 1]} />
        <ScreenMaterial speed={args.speed} lineWidth={args.lineWidth} secondaryColor={args.secondaryColor} />
      </mesh>
      <rectAreaLight ref={rectLightRef} width={width} height={height} rotation-y={Math.PI} />
    </group>
  )
}

export default Screen

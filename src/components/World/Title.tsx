import { Text } from '@react-three/drei'
import { GroupProps, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import Shader from '@/api/Shader'

const fontUrl = '/fonts/Montserrat/Italic.ttf'
const color = '#ffffff'

export interface TitleProps extends GroupProps {
  screenWidth: number
}

function Title(props: TitleProps) {
  const { screenWidth, name = 'Title', ...restProps } = props
  const firstLineRef = useRef<{ fillOpacity?: number }>(null)
  const secondLineRef = useRef<{ fillOpacity?: number }>(null)
  const fontSize = useMemo(() => screenWidth / 10, [screenWidth])
  const lineSpacing = useMemo(() => fontSize / 2, [fontSize])
  const prevOpacity = useRef<number>(-1)

  useFrame(() => {
    if (!firstLineRef.current || !secondLineRef.current) return
    const opacity = Shader.getLoader()
    if (prevOpacity.current !== opacity) {
      firstLineRef.current.fillOpacity = opacity
      secondLineRef.current.fillOpacity = opacity
    }
  })

  return (
    <group name={name} {...restProps}>
      <Text ref={firstLineRef} position={[0, lineSpacing, 0]} font={fontUrl} fontSize={fontSize} color={color}>
        KURBANALI
      </Text>
      <Text ref={secondLineRef} position={[0, -lineSpacing, 0]} font={fontUrl} fontSize={fontSize} color={color}>
        RUSLAN
      </Text>
    </group>
  )
}

export default Title

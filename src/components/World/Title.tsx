import { Text } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { useMemo } from 'react'

export interface TitleProps extends GroupProps {
  screenWidth: number
}

function Title(props: TitleProps) {
  const { screenWidth, name = 'Title', ...restProps } = props
  const fontSize = useMemo(() => screenWidth / 10, [screenWidth])
  const lineSpacing = useMemo(() => fontSize / 2, [fontSize])

  return (
    <group name={name} {...restProps}>
      <Text position={[0, lineSpacing, 0]} font='/fonts/StaffX/Italic.woff' fontSize={fontSize}>
        KURBANALI
      </Text>
      <Text position={[0, -lineSpacing, 0]} font='/fonts/StaffX/Italic.woff' fontSize={fontSize}>
        RUSLAN
      </Text>
    </group>
  )
}

export default Title

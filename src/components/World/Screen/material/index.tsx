import type { ColorRepresentation } from 'three'

export interface ScreenMaterialProps {
  speed?: number
  lineWidth?: number
  wobble?: number
  wobbleTimeScale?: number
  secondaryColor?: ColorRepresentation
}

function ScreenMaterial(props: ScreenMaterialProps) {
  return <screenMaterial {...props} />
}

export default ScreenMaterial

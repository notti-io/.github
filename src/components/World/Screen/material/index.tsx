import type { ColorRepresentation } from 'three'

export interface ScreenMaterialProps {
  speed?: number
  lineWidth?: number
  wobble?: number
  wobbleTimeScale?: number
  color1?: ColorRepresentation
  color2?: ColorRepresentation
}

function ScreenMaterial(props: ScreenMaterialProps) {
  return <screenMaterial {...props} />
}

export default ScreenMaterial

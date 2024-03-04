import type { GroupProps } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import type { ColorRepresentation } from 'three'
import Controls from '@/api/Controls'
import useStore from '@/api/store'
import { falloutTexture } from '@/assets/textures'
import FalloutMaterial from './material'
import FalloutMaterialImpl from './material/FalloutMaterial'
import FalloutGeometry from './geometry'
import FalloutGeometryImpl from './geometry/FalloutGeometry'
import FalloutSimulation from './geometry/FalloutSimulation'

export interface FalloutProps extends GroupProps {
  color?: ColorRepresentation
}

const controls = Controls.folder('World', 'Fallout', {
  count: Controls.select(FalloutGeometryImpl.DEFAULT_COUNT, [4000, 90000, 16000, 25000, 36000, 49000, 64000, 81000, 100000, 1_000_000]),
  size: Controls.num(FalloutMaterialImpl.DEFAULT_SIZE, 0, 2),
  alpha: Controls.num(FalloutMaterialImpl.DEFAULT_ALPHA),
  curlNoiseScale: Controls.num(FalloutSimulation.DEFAULT_CURL_NOISE_SCALE, 0, 100),
  curlNoiseTimeScale: Controls.num(FalloutSimulation.DEFAULT_CURL_NOISE_TIME_SCALE, 0, 10),
  curlNoiseStrength: Controls.num(FalloutSimulation.DEFAULT_CURL_NOISE_STRENGTH),
})

function Fallout(props: FalloutProps) {
  const { name = 'Fallout', color, ...restProps } = props
  const args = useControls(...controls.get())
  const world = useStore(state => state.world)
  const texture = useTexture(falloutTexture)

  return (
    <group name={name} {...restProps}>
      <points scale={[10, 5, 10]} position={[0, 0, -5]}>
        <FalloutMaterial world={world} map={texture} size={args.size} color={color} alpha={args.alpha} />
        <FalloutGeometry
          count={args.count}
          curlNoiseScale={args.curlNoiseScale}
          curlNoiseTimeScale={args.curlNoiseTimeScale}
          curlNoiseStrength={args.curlNoiseStrength}
        />
      </points>
    </group>
  )
}

useTexture.preload(falloutTexture)

export default Fallout

import { EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import Controls from '@/api/Controls'
import useStore from '@/api/store'
import VignetteEffect from './effects/VignetteEffect'
import NoiseEffect from './effects/NoiseEffect'
import GodRaysEffect from './effects/GodRaysEffect'

const folder = 'PostProcessing'
const schema = () => ({ enabled: Controls.bool(true) })
const controls = Controls.create(folder, schema()).get()
const godRaysControls = Controls.folder(folder, 'GodRays', schema()).get()
const vignetteControls = Controls.folder(folder, 'Vignette', schema()).get()
const noiseControls = Controls.folder(folder, 'Noise', schema()).get()

function PostProcessing() {
  const { enabled } = useControls(...controls)
  const godRays = useControls(...godRaysControls)
  const vignette = useControls(...vignetteControls)
  const noise = useControls(...noiseControls)
  const screen = useStore(state => state.screen)

  if (!godRays.enabled && !vignette.enabled && !noise.enabled) return null

  return (
    <EffectComposer enabled={enabled}>
      <GodRaysEffect enabled={godRays.enabled} screen={screen} />
      <VignetteEffect enabled={vignette.enabled} />
      <NoiseEffect enabled={noise.enabled} />
    </EffectComposer>
  )
}

export default PostProcessing

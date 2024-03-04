import { EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import Controls from '@/api/Controls'
import VignetteEffect from './effects/VignetteEffect'
import NoiseEffect from './effects/NoiseEffect'

const folder = 'PostProcessing'
const schema = () => ({ enabled: Controls.bool(true) })
const controls = Controls.create(folder, schema()).get()
const vignetteControls = Controls.folder(folder, 'Vignette', schema()).get()
const noiseControls = Controls.folder(folder, 'Noise', schema()).get()

function PostProcessing() {
  const { enabled } = useControls(...controls)
  const vignette = useControls(...vignetteControls)
  const noise = useControls(...noiseControls)

  if (!vignette.enabled && !noise.enabled) return null

  return (
    <EffectComposer enabled={enabled}>
      <VignetteEffect enabled={vignette.enabled} />
      <NoiseEffect enabled={noise.enabled} />
    </EffectComposer>
  )
}

export default PostProcessing

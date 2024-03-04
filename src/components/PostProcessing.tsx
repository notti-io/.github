import { EffectComposer } from '@react-three/postprocessing'
import { useControls } from 'leva'
import Controls from '@/api/Controls'
import VignetteEffect from './effects/VignetteEffect'

const folder = 'PostProcessing'
const schema = () => ({ enabled: Controls.bool(true) })
const controls = Controls.create(folder, schema()).get()
const vignetteControls = Controls.folder(folder, 'Vignette', schema()).get()

function PostProcessing() {
  const { enabled } = useControls(...controls)
  const vignette = useControls(...vignetteControls)

  if (!vignette.enabled) return null

  return (
    <EffectComposer enabled={enabled}>
      <VignetteEffect enabled={vignette.enabled} />
    </EffectComposer>
  )
}

export default PostProcessing

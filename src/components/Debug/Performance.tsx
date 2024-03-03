import { AdaptiveDpr } from '@react-three/drei'
import { useControls } from 'leva'
import { Fragment, useEffect } from 'react'
import { Perf } from 'r3f-perf'
import Controls from '@/api/Controls'
import useStore, { initialIsDebug } from '@/api/store'

const controls = Controls.create('Performance', {
  monitoring: Controls.bool(initialIsDebug),
  deepAnalyze: Controls.bool(false),
  showGraph: Controls.bool(false),
  minimal: Controls.bool(true),
  matrixUpdate: Controls.bool(false),
})

function Performance() {
  const isDebug = useStore(state => state.isDebug)
  const [state, set] = useControls(...controls.getFn())

  useEffect(() => {
    set({ monitoring: isDebug })
  }, [set, isDebug])

  return (
    <Fragment>
      <AdaptiveDpr />
      {state.monitoring && (
        <Perf
          deepAnalyze={state.deepAnalyze}
          showGraph={state.showGraph}
          minimal={state.minimal}
          matrixUpdate={state.matrixUpdate}
          position='top-left'
        />
      )}
    </Fragment>
  )
}

export default Performance

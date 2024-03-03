import Controls from '@/api/Controls'
import { AdaptiveDpr } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { Fragment, useLayoutEffect } from 'react'

const controls = Controls.create('Performance', {
  monitoring: Controls.bool(true),
  deepAnalyze: Controls.bool(false),
  showGraph: Controls.bool(false),
  minimal: Controls.bool(true),
  matrixUpdate: Controls.bool(false),
})

function Performance() {
  const isDebug = true
  const [state, set] = useControls(...controls.getFn())

  useLayoutEffect(() => {
    if (import.meta.env.DEV) return
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

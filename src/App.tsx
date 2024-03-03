import { Fragment } from 'react'
import Experience from '@/components/Experience'
import LevaGui from '@/components/Debug/LevaGui'
import useDebugWatcher from '@/hooks/useDebugWatcher'
import '@/App.scss'

function App() {
  useDebugWatcher()

  return (
    <Fragment>
      <Experience />
      <LevaGui />
    </Fragment>
  )
}

export default App

import { Fragment } from 'react'
import Experience from '@/components/Experience'
import LevaGui from '@/components/Debug/LevaGui'
import useDebug from '@/hooks/useDebug'
import useMouse from '@/hooks/useMouse'
import '@/App.scss'

function App() {
  useDebug()
  useMouse()

  return (
    <Fragment>
      <Experience />
      <LevaGui />
    </Fragment>
  )
}

export default App

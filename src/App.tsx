import { Fragment } from 'react'
import Experience from '@/components/Experience'
import LevaGui from '@/components/Debug/LevaGui'
import useDebug from '@/hooks/useDebug'
import '@/App.scss'

function App() {
  useDebug()

  return (
    <Fragment>
      <Experience />
      <LevaGui />
    </Fragment>
  )
}

export default App

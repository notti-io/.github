import { Fragment } from 'react'
import Experience from '@/components/Experience'
import LevaGui from '@/components/Debug/LevaGui'
import useDebug from '@/hooks/useDebug'
import usePointer from '@/hooks/usePointer'
import '@/App.scss'

function App() {
  useDebug()
  usePointer()

  return (
    <Fragment>
      <Experience />
      <LevaGui />
    </Fragment>
  )
}

export default App

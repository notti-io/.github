import { Fragment } from 'react'
import Experience from '@/components/Experience'
import Contacts from '@/components/Contacts'
import Navbar from '@/components/Navbar'
import LevaGui from '@/components/LevaGui'
import Cursor from '@/components/Cursor'
import useDebug from '@/hooks/useDebug'
import usePointer from '@/hooks/usePointer'
import '@/App.scss'

function App() {
  useDebug()
  usePointer()

  return (
    <Fragment>
      <Experience />
      <Contacts />
      <Navbar />
      <LevaGui />
      <Cursor />
    </Fragment>
  )
}

export default App

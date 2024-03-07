import { Fragment } from 'react'
import Experience from '@/components/Experience'
import Loader from '@/components/Loader'
import Contacts from '@/components/Contacts'
import Navbar from '@/components/Navbar'
import LevaGui from '@/components/LevaGui'
import Cursor from '@/components/Cursor'
import useDebug from '@/hooks/useDebug'
import usePointer from '@/hooks/usePointer'
import useInitMusic from '@/hooks/useInitMusic'
import '@/App.scss'

function App() {
  useDebug()
  usePointer()
  useInitMusic()

  return (
    <Fragment>
      <Experience />
      <Loader>
        <Contacts />
        <Navbar />
      </Loader>
      <LevaGui />
      <Cursor />
    </Fragment>
  )
}

export default App

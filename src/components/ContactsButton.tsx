import { useCallback } from 'react'
import useStore from '@/api/store'

function ContactsButton() {
  const open = useStore(state => state.isContacts)
  const setOpen = useStore(state => state.setIsContacts)

  const toggle = useCallback(() => {
    setOpen(!open)
  }, [setOpen, open])

  return (
    <button className='contacts-button navbar-text' onClick={toggle}>
      {open ? 'Close-x' : 'Contact'}
      <span className='contacts-button-aura' />
    </button>
  )
}

export default ContactsButton

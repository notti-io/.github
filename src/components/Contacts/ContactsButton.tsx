import { motion } from 'framer-motion'
import { useCallback, useRef } from 'react'
import useStore from '@/api/store'
import { useCursor } from '@/hooks/useCursor'

const transition = { ease: [0.005, 0.985, 0.22, 1], duration: 0.6 }
const variants = (y: '100%' | '-100%') => ({ hidden: { y, opacity: 0 }, visible: { y: 0, opacity: 1 } })

function ContactsButton() {
  const ref = useRef<HTMLButtonElement>(null)
  const open = useStore(state => state.isContacts)
  const setOpen = useStore(state => state.setIsContacts)

  const toggle = useCallback(() => {
    setOpen(!open)
  }, [setOpen, open])

  useCursor('contacts-button', ref)

  return (
    <button ref={ref} className='contacts-button navbar-text' onClick={toggle}>
      <motion.span
        className='contacts-button-text'
        variants={variants('-100%')}
        initial='visible'
        animate={open ? 'hidden' : 'visible'}
        transition={transition}
      >
        Contact
      </motion.span>
      <motion.span
        className='contacts-button-text-close'
        variants={variants('100%')}
        initial='hidden'
        animate={!open ? 'hidden' : 'visible'}
        transition={transition}
      >
        Close-x
      </motion.span>
      <span className='contacts-button-aura' />
    </button>
  )
}

export default ContactsButton

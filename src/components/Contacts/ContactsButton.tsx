import { motion } from 'framer-motion'
import { useCallback, useRef } from 'react'
import useStore from '@/api/store'
import { useCursor } from '@/hooks/useCursor'

const transition = { ease: [0.005, 0.985, 0.22, 1], duration: 0.6 }
const variants = (y: '100%' | '-100%') => ({ hidden: { y, opacity: 0 }, visible: { y: 0, opacity: 1 } })
const textProps = (main: boolean) => (open: boolean) => ({
  className: `contacts-button-text${main ? '' : '-close'}`,
  variants: variants(main ? '-100%' : '100%'),
  initial: main ? 'visible' : 'hidden',
  animate: main ? (open ? 'hidden' : 'visible') : open ? 'visible' : 'hidden',
  transition,
})
const mainProps = textProps(true)
const closeProps = textProps(false)

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
      <motion.span {...mainProps(open)}>Links</motion.span>
      <motion.span {...closeProps(open)}>Close</motion.span>
      <span className='contacts-button-aura' />
    </button>
  )
}

export default ContactsButton

import { motion } from 'framer-motion'

export interface ContactsLinkProps {
  open: boolean
  title: string
  href: string
  delay: number
  duration: number
}

function ContactsLink(props: ContactsLinkProps) {
  const { open, title, href, delay, duration } = props

  return (
    <div className='contacts-socials-link-wrapper'>
      <motion.a
        href={href}
        target='_blank'
        rel='noreferrer'
        className='contacts-socials-link'
        variants={{
          hidden: { y: '100%', pointerEvents: 'none' },
          visible: { y: 0, pointerEvents: 'auto' },
        }}
        initial='hidden'
        animate={open ? 'visible' : 'hidden'}
        transition={{ ease: [0.005, 0.985, 0.22, 1], delay, duration }}
      >
        {title}
      </motion.a>
    </div>
  )
}

export default ContactsLink

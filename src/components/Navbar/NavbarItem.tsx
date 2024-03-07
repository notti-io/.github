import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

function NavbarItem({ children }: PropsWithChildren) {
  return (
    <div className='navbar-item'>
      <motion.div
        initial={{ y: '-100%', opacity: 0, pointerEvents: 'none' }}
        animate={{ y: 0, opacity: 1, pointerEvents: 'auto' }}
        transition={{ ease: [0.25, 1, 0.5, 1], duration: 1 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default NavbarItem

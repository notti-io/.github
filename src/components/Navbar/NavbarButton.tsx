import { motion } from 'framer-motion'
import { useRef } from 'react'
import type { PropsWithChildren } from 'react'
import { useCursor } from '@/hooks/useCursor'

export interface NavbarButtonProps extends PropsWithChildren {
  id: string
  side: 'left' | 'right'
  fixed?: boolean
  onClick: () => void
}

function NavbarButton({ id, side, fixed = true, children, onClick }: NavbarButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  useCursor(id, ref)

  return (
    <motion.div
      className={`navbar-button-${fixed ? 'fixed' : 'static'} navbar-button-${side}`}
      initial={{ scale: 0, opacity: 0, pointerEvents: 'none' }}
      animate={{ scale: 1, opacity: 1, pointerEvents: 'auto' }}
      transition={{ ease: [0.25, 1, 0.5, 1], duration: 1 }}
    >
      <button ref={ref} className='navbar-button' onClick={onClick}>
        {children}
        <span className='navbar-button-aura' />
      </button>
    </motion.div>
  )
}

export default NavbarButton

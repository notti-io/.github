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
    <button ref={ref} className={`navbar-button navbar-button-${fixed ? 'fixed' : 'static'} navbar-button-${side}`} onClick={onClick}>
      {children}
      <span className='navbar-button-aura' />
    </button>
  )
}

export default NavbarButton

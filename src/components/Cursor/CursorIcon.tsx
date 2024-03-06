import { motion } from 'framer-motion'
import { EmailIcon, GitHubIcon, Icon, LinkedInIcon, NextIcon, PauseIcon, PlayIcon, ResumeIcon, TelegramIcon, XIcon } from '@/assets'
import { useMemo } from 'react'

export interface CursorIconProps {
  icon: Icon
  size: number
}

function CursorIcon({ icon, size }: CursorIconProps) {
  const Icon = useMemo(() => {
    switch (icon) {
      case 'Email':
        return EmailIcon
      case 'GitHub':
        return GitHubIcon
      case 'LinkedIn':
        return LinkedInIcon
      case 'Next':
        return NextIcon
      case 'Play':
        return PlayIcon
      case 'Pause':
        return PauseIcon
      case 'Resume':
        return ResumeIcon
      case 'Telegram':
        return TelegramIcon
      case 'X':
        return XIcon
    }
  }, [icon])

  return (
    <div className='cursor-icon-wrapper' style={{ width: size, height: size }}>
      <motion.div
        className='cursor-icon-container'
        variants={{
          base: { x: '-50%', y: '-50%' },
          visible: { scale: 1, opacity: 1 },
          hidden: { scale: 0, opacity: 0 },
        }}
        initial={['base', 'hidden']}
        animate={['base', 'visible']}
        exit={['base', 'hidden']}
        transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.6 }}
      >
        <Icon />
      </motion.div>
    </div>
  )
}

export default CursorIcon

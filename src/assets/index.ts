/// <reference types="vite-plugin-svgr/client" />

import { shuffleMusics } from '@/utils/helpers'

export type Icon = 'Email' | 'GitHub' | 'LinkedIn' | 'Resume' | 'Telegram' | 'X' | 'Play' | 'Pause' | 'Next' | 'Music'

export { default as EmailIcon } from './email.svg?react'
export { default as GitHubIcon } from './github.svg?react'
export { default as LinkedInIcon } from './linkedin.svg?react'
export { default as MusicIcon } from './music.svg?react'
export { default as NextIcon } from './next.svg?react'
export { default as PlayIcon } from './play.svg?react'
export { default as PauseIcon } from './pause.svg?react'
export { default as ResumeIcon } from './resume.svg?react'
export { default as TelegramIcon } from './telegram.svg?react'
export { default as XIcon } from './x.svg?react'

export interface Music {
  url: string
  href: string
}

export const musics: Music[] = shuffleMusics([
  {
    url: '/musics/Natalia Doco, Mattend - Quedate Luna.mp3',
    href: 'https://soundcloud.com/mattend/natalia-doco-mattend-quedate-luna-tiktok-remix',
  },
  {
    url: '/musics/Jidanofu - Drink A Yak.mp3',
    href: 'https://soundcloud.com/jidanofu/drink-a-yak',
  },
  {
    url: '/musics/DVRST - Close Eyes.mp3',
    href: 'https://soundcloud.com/wazmusic/close-eyes',
  },
  {
    url: '/musics/Burak Yeter ft. Danelle Sandoval - Tuesday.mp3',
    href: 'https://soundcloud.com/burakyeter/burakyeter-tuesday',
  },
  {
    url: '/musics/Karma Fields - Edge of the World.mp3',
    href: 'https://soundcloud.com/karmafields/edge-of-the-world',
  },
  {
    url: '/musics/NGHTMRE - Burn Out.mp3',
    href: 'https://soundcloud.com/nghtmre/burn-out',
  },
  {
    url: '/musics/Yellow Claw & Flux Pavilon feat. Naaz - Catch Me.mp3',
    href: 'https://soundcloud.com/yellowclaw/yellow-claw-flux-pavilion-catch-me-feat-naaz',
  },
  {
    url: '/musics/Shanguy - La Louze.mp3',
    href: 'https://soundcloud.com/shanguymusic/shanguy-la-louze',
  },
  {
    url: '/musics/Restricted - Big Jet Plane.mp3',
    href: 'https://soundcloud.com/itsrestricted/big-jet-plane-1',
  },
  {
    url: '/musics/Rick Astley - Never Gonna Give You Up.mp3',
    href: 'https://soundcloud.com/rick-astley-official/never-gonna-give-you-up-4',
  },
])

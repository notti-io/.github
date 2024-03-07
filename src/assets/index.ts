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
    url: '/musics/Zeli - Only The Fallen [NCS Release].mp3',
    href: 'https://youtube.com/watch?v=HipT91U3ujA',
  },
  {
    url: '/musics/Cartoon, Jéja - Why We Lose (feat. Coleman Trapp) [NCS Release].mp3',
    href: 'https://youtube.com/watch?v=zyXmsVwZqX4',
  },
  {
    url: '/musics/CiDE & Vide - Late At Night (feat. Jordan Grace) [NCS Release].mp3',
    href: 'https://youtube.com/watch?v=nABAzVR2txM',
  },
  {
    url: '/musics/Naeleck - Burning Wish (feat. Roniit) [NCS Release].mp3',
    href: 'https://youtube.com/watch?v=42N-FeSAql4',
  },
  {
    url: '/musics/Poylow - Victory (feat. Godmode) [NCS Release].mp3',
    href: 'https://youtube.com/watch?v=bqbctutaRmQ',
  },
  {
    url: '/musics/Anixto - Ride Or Die [NCS Release].mp3',
    href: 'https://youtube.com/watch?v=EpREvrcOKjQ',
  },
])

/// <reference types="vite-plugin-svgr/client" />
export type Icon = 'Email' | 'GitHub' | 'LinkedIn' | 'Resume' | 'Telegram' | 'X' | 'Play' | 'Pause'

export { default as EmailIcon } from './email.svg?react'
export { default as GitHubIcon } from './github.svg?react'
export { default as LinkedInIcon } from './linkedin.svg?react'
export { default as PlayIcon } from './play.svg?react'
export { default as PauseIcon } from './pause.svg?react'
export { default as ResumeIcon } from './resume.svg?react'
export { default as TelegramIcon } from './telegram.svg?react'
export { default as XIcon } from './x.svg?react'

export interface Music {
  url: string
  href: string
}

export const musics: Music[] = [
  {
    url: '/musics/Alok Bruno Martini feat. Zeeba - Hear Me Now.mp3',
    href: 'https://music.apple.com/ru/album/hear-me-now/1337209538?i=1337209540',
  },
  {
    url: "/musics/Eminence ft. Supermans Feinde - Night Goes On (ft. Q'AILA).mp3",
    href: 'https://music.apple.com/ru/album/night-goes-on-feat-qaila/1090378473?i=1090378479',
  },
  {
    url: "/musics/Feint & Laura Brehm - We Won't Be Alone.mp3",
    href: 'https://music.apple.com/ru/album/we-wont-be-alone-feat-laura-brehm/1036325381?i=1036326765',
  },
  {
    url: "/musics/Low Roar Don't Be So Serious.mp3",
    href: 'https://music.apple.com/ru/album/dont-be-so-serious/1496871665?i=1496871739',
  },
  {
    url: '/musics/Natalia Doco, Devendra Banhart - Quedate Luna.mp3',
    href: 'https://soundcloud.com/bodave-li/natalia-doco-ft-devendra-banhart-quedate-luna-10-ton-obsidian-spin-alonga-rework?in=mohammad_mu/sets/best-of-deep-house-ep-r-b',
  },
  {
    url: '/musics/Restricted - Big Jet Plane.mp3',
    href: 'https://music.apple.com/kz/album/big-jet-plane/1658524066?i=1658524143',
  },
]

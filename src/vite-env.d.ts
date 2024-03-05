/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FULL_NAME: string
  readonly VITE_NICK_NAME: string
  readonly VITE_POSITION_NAME: string
  readonly VITE_TITLE: string
  readonly VITE_DESCRIPTION: string
  readonly VITE_COUNTRY: string
  readonly VITE_CITY: string
  readonly VITE_TIME_ZONE: string

  readonly VITE_SITE_URL: string
  readonly VITE_EMAIL: string
  readonly VITE_LINKEDIN_HANDLE: string
  readonly VITE_GITHUB_HANDLE: string
  readonly VITE_TELEGRAM_HANDLE: string
  readonly VITE_TWITTER_HANDLE: string
  readonly VITE_RESUME_FILE_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

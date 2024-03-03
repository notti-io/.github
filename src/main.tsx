import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { alwaysRedirectTo, disableReactDevToolsIf } from '@/utils/others'

disableReactDevToolsIf(import.meta.env.PROD)
alwaysRedirectTo('/')

const app = document.getElementById('app')!
const root = createRoot(app)

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

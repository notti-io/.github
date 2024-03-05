import useStore from '@/api/store'
import ContactsLink from './ContactsLink'
import { Icon } from '@/assets'

interface ContactSocial {
  title: string
  href: string
  icon: Icon
}

const contacts: ContactSocial[] = [
  { title: 'Email', href: `mailto:${import.meta.env.VITE_EMAIL}`, icon: 'Email' },
  { title: 'LinkedIn', href: `https://linkedin.com/in/${import.meta.env.VITE_LINKEDIN_HANDLE}`, icon: 'LinkedIn' },
  { title: 'GitHub', href: `https://github.com/${import.meta.env.VITE_GITHUB_HANDLE}`, icon: 'GitHub' },
  { title: 'Telegram', href: `https://t.me/${import.meta.env.VITE_TELEGRAM_HANDLE}`, icon: 'Telegram' },
  { title: 'X / Twitter', href: `https://twitter.com/${import.meta.env.VITE_TWITTER_HANDLE}`, icon: 'X' },
  { title: 'Resume', href: `/${import.meta.env.VITE_RESUME_FILE_NAME}.pdf`, icon: 'Resume' },
]

function Contacts() {
  const open = useStore(state => state.isContacts)

  return (
    <div className='contacts'>
      <div className='contacts-socials'>
        {contacts.map((link, index) => (
          <ContactsLink
            key={link.title}
            open={open}
            title={link.title}
            href={link.href}
            icon={link.icon}
            delay={(index + 1) * 0.05 + 0.4}
            duration={0.7 + index * 0.1}
          />
        ))}
      </div>
    </div>
  )
}

export default Contacts

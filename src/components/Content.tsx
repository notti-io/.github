import { AnimatePresence, motion } from 'framer-motion'
import useStore from '@/api/store'
import Contacts from './Contacts'

function Content() {
  const isContacts = useStore(state => state.isContacts)

  return (
    <main className='content'>
      <AnimatePresence mode='wait'>
        {!isContacts && (
          <motion.div key='title' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Hello
          </motion.div>
        )}
        {isContacts && <Contacts key='contacts' />}
      </AnimatePresence>
    </main>
  )
}

export default Content

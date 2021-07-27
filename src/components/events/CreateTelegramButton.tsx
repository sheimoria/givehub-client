import { PaperAirplaneIcon } from '@heroicons/react/solid'
import Transit from 'components/Transit'
import useToggle from 'utils/useToggle'
import CreateTelegramModal from './CreateTelegramModal'

export default function CreateTelegramButton() {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <Transit
        as="button"
        className="flex-1 bg-blue-500 border border-blue-500 dark:bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 hover:border-blue-600 dark:hover:border-blue-600"
        onClick={toggleIsOpen}
      >
        <PaperAirplaneIcon className="text-white" />
        Create Telegram Group
      </Transit>
      {isOpen && <CreateTelegramModal toggleIsOpen={toggleIsOpen} />}
    </>
  )
}

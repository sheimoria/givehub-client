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
        className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
        onClick={toggleIsOpen}
      >
        <PaperAirplaneIcon />
        Create Telegram Group
      </Transit>
      {isOpen && <CreateTelegramModal toggleIsOpen={toggleIsOpen} />}
    </>
  )
}

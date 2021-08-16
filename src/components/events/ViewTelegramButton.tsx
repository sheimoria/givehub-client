import { PaperAirplaneIcon } from '@heroicons/react/solid'
import Transit from 'components/Transit'
import { UserHeaderFragment } from 'generated/graphql'
import ViewTelegramModal from './ViewTelegramModal'
import useToggle from 'utils/useToggle'

export default function ViewTelegramButton({
  volunteers
}: {
  volunteers: UserHeaderFragment[]
}) {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <Transit
        as="button"
        className="flex items-center justify-center flex-1 gap-2 px-4 py-3 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
        onClick={toggleIsOpen}
      >
        <PaperAirplaneIcon />
        View Telegram Usernames
      </Transit>
      {isOpen && (
        <ViewTelegramModal
          toggleIsOpen={toggleIsOpen}
          volunteers={volunteers}
        />
      )}
    </>
  )
}

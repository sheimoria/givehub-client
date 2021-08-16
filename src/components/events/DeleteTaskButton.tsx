import DeleteTaskModal from './DeleteTaskModal'
import { TrashIcon } from '@heroicons/react/outline'
import useToggle from 'utils/useToggle'

export default function DeleteTaskButton({ taskId }: { taskId: number }) {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <TrashIcon onClick={toggleIsOpen} className="clickable" />
      {isOpen && (
        <DeleteTaskModal toggleIsOpen={toggleIsOpen} taskId={taskId} />
      )}
    </>
  )
}

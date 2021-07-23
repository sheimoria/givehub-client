import { ClipboardIcon } from '@heroicons/react/outline'
import CreateTask from './CreateTask'
import Transit from 'components/Transit'
import { useState } from 'react'

export default function CreateTaskButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Transit
        as="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2"
      >
        <ClipboardIcon className="text-white dark:text-white" />
        Create Task
      </Transit>
      <CreateTask isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

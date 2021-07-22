import { CalendarIcon } from '@heroicons/react/outline'

type Props = {
  dateStart: string
  dateEnd: string
}

export default function Datetime({ dateStart, dateEnd }: Props) {
  return (
    <div className="flex items-center gap-2">
      <CalendarIcon />
      <p>
        {new Date(parseInt(dateStart)).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric'
        })}{' '}
        —{' '}
        {new Date(parseInt(dateEnd)).toLocaleString('en-US', {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric'
        })}
      </p>
    </div>
  )
}

import { CalendarIcon } from '@heroicons/react/outline'
import formatDatetime from 'utils/Datetime'

type Props = {
  dateStart: string
  dateEnd: string
}

export default function Datetime({ dateStart, dateEnd }: Props) {
  return (
    <div className="flex items-center gap-2">
      <CalendarIcon className="text-rose-600 dark:text-rose-600" />
      <h6>
        {formatDatetime(dateStart)} — {formatDatetime(dateEnd)}
      </h6>
    </div>
  )
}

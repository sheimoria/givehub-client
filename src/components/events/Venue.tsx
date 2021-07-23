import { LocationMarkerIcon } from '@heroicons/react/outline'

export default function Venue({ venue }: { venue: string }) {
  return (
    <div className="flex items-center gap-2">
      <LocationMarkerIcon className="text-rose-600 dark:text-rose-600" />
      <h6>{venue}</h6>
    </div>
  )
}

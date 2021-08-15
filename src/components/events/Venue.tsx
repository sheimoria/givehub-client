import { LocationMarkerIcon } from '@heroicons/react/outline'

export default function Venue({ venue }: { venue: string }) {
  return (
    <div className="flex items-center gap-2">
      <LocationMarkerIcon className="text-rose-600" />
      <p>{venue}</p>
    </div>
  )
}

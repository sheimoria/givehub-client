import {
  CalendarIcon,
  LocationMarkerIcon,
  ThumbUpIcon,
  UsersIcon
} from '@heroicons/react/solid'
import Like from 'components/events/Like'
import Edit from 'components/events/Edit'
import Image from 'next/image'
import Link from 'next/link'
import useEventQuery from 'hooks/useEventQuery'

export default function Event({ id, truncate }) {
  const { data, loading, error } = useEventQuery(id)

  return (
    <article className={(loading && 'bg-opacity-50 animate-pulse') || ''}>
      {error && <p>{error.message}</p>}
      {data && data.event && (
        <>
          {!truncate && (
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/avatar.svg"
                  alt="Avatar"
                  height={36}
                  width={36}
                  className="rounded-full"
                />
                <div className="flex flex-col">
                  <Link href={`/charities/${data.event.charity.id}`}>
                    <a>{data.event.charity.name}</a>
                  </Link>
                  <p>
                    {new Date(parseInt(data.event.createdAt)).toLocaleString(
                      'en-US',
                      {
                        day: 'numeric',
                        month: 'short',
                        hour: 'numeric',
                        minute: 'numeric'
                      }
                    )}
                  </p>
                </div>
              </div>
              <Edit event={data.event} />
            </div>
          )}

          <Link href={`/events/${id}`}>
            <a className={(truncate && 'truncate text-sm') || 'text-base'}>
              {data.event.name}
            </a>
          </Link>

          {!truncate && (
            <div className="flex gap-4">
              <Datetime
                dateStart={data.event.dateStart}
                dateEnd={data.event.dateEnd}
              />
              <Venue venue={data.event.venue} />
            </div>
          )}
          <p className={truncate ? 'truncate' : 'line-clamp-4'}>
            {data.event.description}
          </p>
          <div className="flex gap-4">
            <Like eventId={data.event.id} likeNumber={data.event.likeNumber} />
            <RequestNumber volunteerNumber={data.event.volunteerNumber} />
          </div>
        </>
      )}
    </article>
  )
}

export function Datetime({ dateStart, dateEnd }) {
  return (
    <div className="flex items-center gap-2">
      <CalendarIcon className="w-5 h-5 text-gray-400" />
      <h6 className="font-normal">
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
      </h6>
    </div>
  )
}

export function Venue({ venue }) {
  return (
    <div className="flex items-center gap-1">
      <LocationMarkerIcon className="w-5 h-5 text-gray-400" />
      <h6 className="font-normal">{venue}</h6>
    </div>
  )
}

export function RequestNumber({ requestNumber }) {
  /* const { data } = useQuery(gql`query VolunteerNumber {
      
  }`) */

  return (
    <div className="flex items-center gap-1">
      <UsersIcon className="w-5 h-5 text-gray-400" />
      <p className="font-medium">{requestNumber}</p>
    </div>
  )
}

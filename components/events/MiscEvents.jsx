import TrendingEvents from 'components/events/TrendingEvents'
import UpcomingEvents from 'components/events/UpcomingEvents'

export default function MiscEvents() {
  return (
    <aside className="w-96 lg:block">
      <div className="sticky flex flex-col gap-6 top-6">
        <TrendingEvents />
        <UpcomingEvents />
      </div>
    </aside>
  )
}

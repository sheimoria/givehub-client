import {
  EventInfoFragment,
  PostCardFragment,
  PostLikesFragmentDoc
} from 'generated/graphql'

import EventPreview from 'components/events/EventPreview'
import Image from 'next/image'
import LikePost from './LikePost'
import Link from 'next/link'
import Transit from 'components/Transit'
import { filter } from 'graphql-anywhere'

type PostProps = {
  postCard: PostCardFragment
  eventInfo: EventInfoFragment | undefined
  lineclamp?: boolean
}

export default function Post({ postCard, eventInfo, lineclamp }: PostProps) {
  return (
    <Transit>
      <article>
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
              <Link
                href={{
                  pathname: '/user',
                  query: { userId: postCard.creator.id }
                }}
              >
                <a>
                  {postCard.creator?.profile?.firstName}{' '}
                  {postCard.creator?.profile?.lastName}
                </a>
              </Link>
              <p>
                {new Date(parseInt(postCard.createdAt)).toLocaleString(
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
        </div>
        <p className={lineclamp ? 'line-clamp-3' : ''}>{postCard.text}</p>
        {eventInfo && <EventPreview eventInfo={eventInfo} />}
        <LikePost likePost={filter(PostLikesFragmentDoc, postCard)} />
      </article>
    </Transit>
  )
}

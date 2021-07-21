import {
  EPost,
  EventInfoFragmentDoc,
  PostLikesFragmentDoc
} from 'generated/graphql'

import EventPreview from 'components/events/EventPreview'
import Image from 'next/image'
import LikePost from './LikePost'
import Link from 'next/link'
import Transit from 'components/Transit'
import { filter } from 'graphql-anywhere'
import { useRouter } from 'next/router'

type PostProps = {
  post: EPost
  lineclamp?: boolean
}

export default function Post({ post, lineclamp }: PostProps) {
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
                  query: { userId: post.post.creator.id }
                }}
              >
                <a>
                  {post.post.creator.profile.firstName}{' '}
                  {post.post.creator.profile.lastName}
                </a>
              </Link>
              <p>
                {new Date(parseInt(post.post.createdAt)).toLocaleString(
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
        <p className={lineclamp ? 'line-clamp-3' : ''}>{post.post.text}</p>
        {post.event && (
          <EventPreview eventInfo={filter(EventInfoFragmentDoc, post.event)} />
        )}
        <LikePost likePost={filter(PostLikesFragmentDoc, post.post)} />
      </article>
    </Transit>
  )
}

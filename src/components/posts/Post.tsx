import { Image as CImage, Transformation } from 'cloudinary-react'
import {
  EventInfoFragment,
  PostCardFragment,
  PostLikesFragmentDoc
} from 'generated/graphql'

import EventPreview from 'components/events/EventPreview'
import LikePost from './LikePost'
import Link from 'next/link'
import Transit from 'components/Transit'
import UpdatePostButton from './UpdatePostButton'
import { filter } from 'graphql-anywhere'
import Picture from 'components/Picture'

type PostProps = {
  post: PostCardFragment
  event: EventInfoFragment | undefined
  lineclamp?: boolean
}

export default function Post({ post, event, lineclamp }: PostProps) {
  return (
    <Transit>
      <article className="gap-0 p-0">
        <div className="flex flex-col gap-3 px-5 pt-5 pb-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Picture
                pictureId={post.creator.profile?.displayPicture}
                size={10}
              />
              <div className="flex flex-col">
                <Link
                  href={{
                    pathname: '/user',
                    query: { userId: post.creator.id }
                  }}
                >
                  <a>
                    {post.creator?.profile?.firstName}{' '}
                    {post.creator?.profile?.lastName}
                  </a>
                </Link>
                <p>
                  {new Date(parseInt(post.createdAt)).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </p>
              </div>
            </div>
            {post.creatorStatus && <UpdatePostButton post={post} />}
          </div>
          <p className={lineclamp ? 'line-clamp-3' : ''}>{post.text}</p>
        </div>
        {post.imageUrl && (
          <div className="mb-3 overflow-hidden bordered">
            <CImage
              cloudName="givehub"
              secure
              upload_preset="postImages"
              publicId={post.imageUrl}
              alt="Event image"
              dpr="auto"
              responsive
              crop="scale"
              responsiveUseBreakpoints="true"
            >
              <Transformation quality="auto" fetchFormat="auto" />
            </CImage>
          </div>
        )}
        {event && <EventPreview event={event} />}
        <div className="flex items-center gap-3 px-5 pb-5">
          <LikePost likePost={filter(PostLikesFragmentDoc, post)} />
        </div>
      </article>
    </Transit>
  )
}

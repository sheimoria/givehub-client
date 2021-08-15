import {
  EventInfoFragment,
  PostCardCommentInputFragmentDoc,
  PostCardFragment,
  PostInfoFragmentDoc,
  PostLikesFragmentDoc
} from 'generated/graphql'

import EventPreview from 'components/events/EventPreview'
import Image from 'next/image'
import LikePost from './LikePost'
import Link from 'next/link'
import Picture from 'components/Picture'
import PostCardCommentInput from './PostCardCommentInput'
import PostCardComments from './PostCardComments'
import PostCommentsButton from 'components/posts/PostCommentsButton'
import Transit from 'components/Transit'
import UpdateDeletePostButton from './UpdateDeletePostButton'
import { filter } from 'graphql-anywhere'
import { formatDistanceToNow } from 'date-fns'
import useToggle from 'utils/useToggle'

type PostProps = {
  post: PostCardFragment
  event: EventInfoFragment | undefined
  lineclamp?: boolean
}

export default function PostCard({ post, event, lineclamp }: PostProps) {
  const [comments, toggleComments] = useToggle()

  return (
    <Transit as="article">
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-3">
          <Picture pictureId={post.creator.profile?.displayPicture} />
          <div className="flex flex-col">
            <Link
              href={{
                pathname: '/user',
                query: { userId: post.creator.id }
              }}
            >
              <a className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-100">
                {post.creator?.profile?.firstName}{' '}
                {post.creator?.profile?.lastName}
              </a>
            </Link>
            <p className="text-xs">
              {formatDistanceToNow(parseInt(post.createdAt), {
                addSuffix: true,
                includeSeconds: true
              })}
            </p>
          </div>
        </div>
        {post.creatorStatus && (
          <UpdateDeletePostButton post={filter(PostInfoFragmentDoc, post)} />
        )}
      </div>
      <p className={lineclamp ? 'line-clamp-3' : ''}>{post.text}</p>
      {post.imageUrl && (
        <div className="relative overflow-hidden rounded-md h-80">
          <Image
            src={`https://res.cloudinary.com/givehub/image/upload/v1627495464/${post.imageUrl}`}
            alt="Event image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      {event && <EventPreview event={event} />}
      <div className="flex items-center gap-4">
        <LikePost likePost={filter(PostLikesFragmentDoc, post)} />
        <PostCommentsButton
          toggleComments={toggleComments}
          commentNumber={post.commentNumber}
        />
      </div>
      {comments && (
        <div className="flex flex-col gap-4">
          <PostCardCommentInput
            post={filter(PostCardCommentInputFragmentDoc, post)}
          />
          <PostCardComments postId={post.id} />
        </div>
      )}
    </Transit>
  )
}

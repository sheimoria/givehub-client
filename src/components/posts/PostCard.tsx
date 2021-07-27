import { Image as CImage, Transformation } from 'cloudinary-react'
import {
  EventInfoFragment,
  PostCardCommentInputFragmentDoc,
  PostCardFragment,
  PostInfoFragmentDoc,
  PostLikesFragmentDoc
} from 'generated/graphql'

import EventPreview from 'components/events/EventPreview'
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
    <Transit>
      <article className="gap-0 px-0 py-5">
        <div className="flex flex-col gap-3 px-5 pb-3">
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
                <p className="text-xs">
                  {formatDistanceToNow(parseInt(post.createdAt), {
                    addSuffix: true,
                    includeSeconds: true
                  })}
                </p>
              </div>
            </div>
            {post.creatorStatus && (
              <UpdateDeletePostButton
                post={filter(PostInfoFragmentDoc, post)}
              />
            )}
          </div>
          <p className={lineclamp ? 'line-clamp-3' : ''}>{post.text}</p>
        </div>
        {post.imageUrl && (
          <div className="mb-3 overflow-hidden border-l-0 border-r-0 bordered">
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
        <div className="flex items-center gap-3 px-5">
          <LikePost likePost={filter(PostLikesFragmentDoc, post)} />
          <PostCommentsButton
            toggleComments={toggleComments as () => void}
            commentNumber={post.commentNumber}
          />
        </div>
        {comments && (
          <div className="flex flex-col gap-3 px-5 pt-5">
            <PostCardCommentInput
              post={filter(PostCardCommentInputFragmentDoc, post)}
            />
            <PostCardComments postId={post.id} />
          </div>
        )}
      </article>
    </Transit>
  )
}

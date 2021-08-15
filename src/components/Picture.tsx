import { Image as CImage, Transformation } from 'cloudinary-react'

import Image from 'next/image'
import { Maybe } from 'generated/graphql'

type Props = {
  pictureId: Maybe<string> | undefined
  size?: number
  onClick?: () => void
  className?: string
}

export default function Picture({
  pictureId,
  size,
  onClick,
  className
}: Props) {
  return (
    <div
      onClick={onClick}
      className={
        `relative overflow-hidden rounded-full bordered h-12 w-12 flex-none flex` +
        className
      }
    >
      {pictureId ? (
        <Image
          src={`https://res.cloudinary.com/givehub/image/upload/v1627495464/${pictureId}`}
          alt="Profile picture"
          layout="fill"
        />
      ) : (
        <Image src="/avatar.svg" alt="Picture" layout="fill" />
      )}
    </div>
  )
}

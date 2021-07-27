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
        `relative overflow-hidden rounded-full bordered h-${size} w-${size} flex-none flex` +
        className
      }
    >
      {pictureId ? (
        <CImage
          cloudName="givehub"
          secure
          upload_preset="userPictures"
          publicId={pictureId}
          alt="Picture"
        >
          <Transformation quality="auto" fetchFormat="auto" />
        </CImage>
      ) : (
        <Image src="/avatar.svg" alt="Picture" layout="fill" />
      )}
    </div>
  )
}

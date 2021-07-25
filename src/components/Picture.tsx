import { Image as CImage, Transformation } from 'cloudinary-react'

import Image from 'next/image'
import { Maybe } from 'generated/graphql'

type Props = {
  pictureId: Maybe<string> | undefined
  size: number
}

export default function Picture({ pictureId, size }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-full h-${size} w-${size} bordered flex-none`}
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

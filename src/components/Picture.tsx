import Image from 'next/image'
import { Maybe } from 'generated/graphql'

type Props = {
  pictureId: Maybe<string> | undefined
  onClick?: () => void
}

export default function Picture({ pictureId, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={'relative overflow-hidden rounded-full h-11 w-11 flex-none'}
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

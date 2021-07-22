import Image from 'next/image'
import React from 'react'

export default function Picture({ size }: { size: number }) {
  return (
    <Image
      src="/avatar.svg"
      alt="Avatar"
      height={size}
      width={size}
      className="rounded-full "
    />
  )
}

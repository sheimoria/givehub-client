import { PhotographIcon } from '@heroicons/react/outline'
import { useState } from 'react'

type UploadImageProps = {
  setImage: (arg0: any) => void
}

export default function UploadImageButton({ setImage }: UploadImageProps) {
  const [label, setLabel] = useState('Upload Image')
  return (
    <>
      <label htmlFor="imageUpload" className="button-upload">
        <PhotographIcon className="icon-upload" />
        {label}
      </label>
      <input
        id="imageUpload"
        type="file"
        onChange={(event) => {
          if (!event.target.files) return
          setImage(event.target.files[0])
          setLabel(event.target.files[0].name.substr(0, 9) + '\u2026')
        }}
        className="hidden"
      />
    </>
  )
}

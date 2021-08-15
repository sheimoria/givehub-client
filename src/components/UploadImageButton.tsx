import { PhotographIcon } from '@heroicons/react/outline'
import { useState } from 'react'

type UploadImageProps = {
  label?: string
  setImage: (arg0: any) => void
}

export default function UploadImageButton({
  label,
  setImage
}: UploadImageProps) {
  const [name, setName] = useState(label ? label : 'Upload Image')
  return (
    <>
      <label htmlFor="imageUpload" className="justify-center btn-secondary">
        <PhotographIcon />
        {name}
      </label>
      <input
        id="imageUpload"
        type="file"
        onChange={(event) => {
          if (!event.target.files) return
          setImage(event.target.files[0])
          setName(event.target.files[0].name.substr(0, 9) + '\u2026')
        }}
        className="hidden"
      />
    </>
  )
}

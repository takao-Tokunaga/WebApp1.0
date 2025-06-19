'use client'

import { useState } from 'react'

type Props = {
  onUploadComplete: (url: string) => void
}

export default function UploadImage({ onUploadComplete }: Props) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // プレビュー表示
    setPreview(URL.createObjectURL(file))

    // Cloudinary にアップロード
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const data = await res.json()
    onUploadComplete(data.secure_url)
  }

  return (
    <div className="mb-4 text-center">
        <label className="cursor-pointer border border-black bg-white text-black py-1 px-2 rounded hover:bg-gray-200 inline-block">
            画像を選択
            <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className='hidden'
            />
        </label>   
    </div>
  )
}

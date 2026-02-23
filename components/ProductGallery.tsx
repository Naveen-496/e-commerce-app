'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-secondary rounded-sm">
        <Image
          src={images[selectedImage]}
          alt={`${name} - Image ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-24 overflow-hidden rounded-sm border-2 transition-colors ${
              selectedImage === index
                ? 'border-accent'
                : 'border-border hover:border-muted-foreground'
            }`}
          >
            <Image
              src={image}
              alt={`${name} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

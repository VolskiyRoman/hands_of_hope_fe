import React from 'react'
import Image from 'next/image'

type StaticSideImageProps = {
  src: string
  alt?: string
  className?: string
  children?: React.ReactNode
}

const StaticSideImage = React.memo(
  ({ src, alt = 'Background', className = '', children }: StaticSideImageProps) => {
    return (
      <div className={`relative w-full md:w-1/2 h-[300px] md:h-auto ${className}`}>
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          priority
        />
        {children && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {children}
          </div>
        )}
      </div>
    )
  }
)

StaticSideImage.displayName = 'StaticSideImage'
export default StaticSideImage

import { getBackendUrl } from '@/config'
import { ImageItem } from '@/types'
import { Image } from 'antd'
import queryString from 'query-string'
import React, { useEffect } from 'react'

interface Props {
  image?: ImageItem
  onPreviewImageNavigate: (next: boolean) => void
}

const ImageViewComponent: React.FC<Props> = ({ image, onPreviewImageNavigate }) => {
  if (!image) return null
  const keyHandler: (ev: KeyboardEvent) => void = (ev: KeyboardEvent) => {
    if (ev.key === 'ArrowRight') {
      onPreviewImageNavigate(true)
    } else {
      onPreviewImageNavigate(false)
    }
  }

  useEffect(() => {
    if (image !== undefined) {
      document.addEventListener('keydown', keyHandler)
      return () => document.removeEventListener('keydown', keyHandler)
    }
  }, [image])

  return (
    <Image
      src={image !== undefined ? getBackendUrl(queryString.stringifyUrl({ url: `/view`, query: image })) : undefined}
    />
  )
}

export default React.memo(ImageViewComponent)

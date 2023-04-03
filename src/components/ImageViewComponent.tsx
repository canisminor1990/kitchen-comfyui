import { getBackendUrl } from '@/config'
import { ImageItem } from '@/types'
import { Image } from 'antd'
import queryString from 'query-string'
import React from 'react'

interface Props {
  image?: ImageItem
}

const ImageViewComponent: React.FC<Props> = ({ image }) => {
  if (!image) return null

  return (
    <Image
      src={image !== undefined ? getBackendUrl(queryString.stringifyUrl({ url: `/view`, query: image })) : undefined}
    />
  )
}

export default React.memo(ImageViewComponent)

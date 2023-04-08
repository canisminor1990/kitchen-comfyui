import { ImagePreview } from '@/components/NodeComponent'
import { emptyImg } from '@/components/theme'
import { getBackendUrl } from '@/utils'
import { Image } from 'antd'
import queryString from 'query-string'
import React, { useCallback } from 'react'

interface NodeImgPreviewProps {
  data?: ImagePreview[]
}

const NodeImgPreview: React.FC<NodeImgPreviewProps> = ({ data }) => {
  const renderImage = useCallback(
    ({ image, index }: ImagePreview) => (
      <Image
        height={'100%'}
        key={index}
        src={getBackendUrl(queryString.stringifyUrl({ url: `/view`, query: image }))}
        fallback={emptyImg}
      />
    ),
    []
  )

  if (!data || data.length === 0) return null
  return <Image.PreviewGroup>{data.map(renderImage).reverse()}</Image.PreviewGroup>
}

export default React.memo(NodeImgPreview)

import { ImagePreview } from '@/components/NodeComponent/index'
import { emptyImg } from '@/components/theme'
import { getBackendUrl } from '@/config'
import { Image } from 'antd'
import queryString from 'query-string'
import React from 'react'

interface NodeImgPreviewProps {
  data?: ImagePreview[]
}

const NodeImgPreview: React.FC<NodeImgPreviewProps> = ({ data }) => {
  if (!data || data.length === 0) return null
  return (
    <Image.PreviewGroup>
      {data
        .map(({ image, index }) => (
          <Image
            height={'100%'}
            key={index}
            src={getBackendUrl(queryString.stringifyUrl({ url: `/view`, query: image }))}
            fallback={emptyImg}
          />
        ))
        .reverse()}
    </Image.PreviewGroup>
  )
}

export default React.memo(NodeImgPreview)

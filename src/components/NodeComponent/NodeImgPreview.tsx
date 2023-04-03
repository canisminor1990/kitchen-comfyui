import { ImagePreview } from '@/components/NodeComponent/index'
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
            width={256}
            key={index}
            src={getBackendUrl(queryString.stringifyUrl({ url: `/view`, query: image }))}
          />
        ))
        .reverse()}
    </Image.PreviewGroup>
  )
}

export default React.memo(NodeImgPreview)

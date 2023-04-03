import { getBackendUrl } from '@/config'
import { type GalleryItem } from '@/types'
import { Empty, Image } from 'antd'
import queryString from 'query-string'
import React from 'react'
import styled from 'styled-components'

const ImgList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

interface Props {
  gallery: GalleryItem[]
}

const GalleryComponent: React.FC<Props> = ({ gallery }) => {
  return gallery.length === 0 ? (
    <Empty
      style={{ marginTop: '40vh' }}
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      description="Nothing here yet!"
    />
  ) : (
    <Image.PreviewGroup>
      <ImgList>
        {gallery
          .map(({ image }) => (
            <Image
              width={125}
              height={125}
              key={image.filename}
              src={getBackendUrl(queryString.stringifyUrl({ url: `/view`, query: image }))}
            />
          ))
          .reverse()}
      </ImgList>
    </Image.PreviewGroup>
  )
}

export default React.memo(GalleryComponent)

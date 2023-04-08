import { emptyImg } from '@/components/theme'
import { useAppStore } from '@/store'
import { getBackendUrl } from '@/utils'
import { Empty, Image } from 'antd'
import queryString from 'query-string'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

const EMPTY_IMAGE = 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
const EMPTY_DESCRIPTION = 'Nothing here yet!'

/******************************************************
 *********************** Style *************************
 ******************************************************/

const ImgList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

/******************************************************
 ************************* Dom *************************
 ******************************************************/
const GalleryComponent: React.FC = () => {
  const { gallery } = useAppStore((state) => state, shallow)

  const renderImage = useCallback(({ image }: any) => {
    const src = getBackendUrl(queryString.stringifyUrl({ url: `/view`, query: image }))
    return <Image key={image.filename} src={src} fallback={emptyImg} width={125} height={125} />
  }, [])

  return (
    <Image.PreviewGroup>
      {!gallery.length ? (
        <Empty style={{ marginTop: '40vh' }} image={EMPTY_IMAGE} description={EMPTY_DESCRIPTION} />
      ) : (
        <ImgList>{gallery.reverse().map(renderImage)}</ImgList>
      )}
    </Image.PreviewGroup>
  )
}

export default React.memo(GalleryComponent)

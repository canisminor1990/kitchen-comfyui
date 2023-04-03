import { ImageViewComponent } from '@/components'
import { useAppStore } from '@/store'
import React from 'react'
import { shallow } from 'zustand/shallow'

const ImageViewContainer: React.FC = () => {
  const { image, onPreviewImageNavigate } = useAppStore(
    (st) => ({
      image: st.previewedImageIndex !== undefined ? st.gallery[st.previewedImageIndex]?.image : undefined,
      onHideImagePreview: st.onHideImagePreview,
      onPreviewImageNavigate: st.onPreviewImageNavigate,
    }),
    shallow
  )
  return <ImageViewComponent image={image} onPreviewImageNavigate={onPreviewImageNavigate} />
}

export default React.memo(ImageViewContainer)

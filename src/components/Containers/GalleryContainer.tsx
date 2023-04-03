import { GalleryComponent } from '@/components'
import { useAppStore } from '@/store'
import React from 'react'
import { shallow } from 'zustand/shallow'

const GalleryContainer: React.FC = () => {
  const { gallery, onPreviewImage, onLoadImageWorkflow } = useAppStore(
    (st) => ({ gallery: st.gallery, onPreviewImage: st.onPreviewImage, onLoadImageWorkflow: st.onLoadImageWorkflow }),
    shallow
  )
  return (
    <GalleryComponent gallery={gallery} onPreviewImage={onPreviewImage} onLoadImageWorkflow={onLoadImageWorkflow} />
  )
}

export default React.memo(GalleryContainer)

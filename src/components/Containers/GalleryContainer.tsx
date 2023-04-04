import { GalleryComponent } from '@/components'
import { useAppStore } from '@/store'
import React from 'react'
import { shallow } from 'zustand/shallow'

const GalleryContainer: React.FC = () => {
  const { gallery } = useAppStore((st) => ({ gallery: st.gallery }), shallow)
  return <GalleryComponent gallery={gallery} />
}

export default React.memo(GalleryContainer)

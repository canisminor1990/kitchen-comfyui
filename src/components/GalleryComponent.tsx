import { getBackendUrl } from '@/config'
import { ImageItem, type GalleryItem } from '@/types'
import queryString from 'query-string'
import React, { useState } from 'react'

interface Props {
  gallery: GalleryItem[]
  onPreviewImage: (idx: number) => void
  onLoadImageWorkflow: (image: ImageItem) => void
}

const GalleryComponent: React.FC<Props> = ({ gallery, onPreviewImage, onLoadImageWorkflow }) => {
  return gallery.length === 0 ? (
    <div className="m-auto w-full text-center text-stone-500">Nothing here yet!</div>
  ) : (
    <>
      <div className="p-1 h-full w-full flex flex-col flex-wrap content-start overflow-x-scroll">
        {gallery
          .map(({ image }, i) => (
            <GalleryItem
              key={image.filename}
              image={image}
              onView={() => onPreviewImage(i)}
              onLoadWorkflow={() => onLoadImageWorkflow(image)}
            />
          ))
          .reverse()}
      </div>
    </>
  )
}

interface GalleryItemProps {
  image: ImageItem
  onView: () => void
  onLoadWorkflow: () => void
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, onView, onLoadWorkflow }) => {
  const [isHovered, setHovered] = useState(false)
  return (
    <div
      className="relative cursor-pointer"
      style={{ width: '146px', height: '146px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onView}
    >
      <img
        key={image.filename}
        className="absolute p-1 rounded-xl drop-shadow-md"
        src={getBackendUrl(queryString.stringifyUrl({ url: `/view`, query: image }))}
      />
      {isHovered ? (
        <div className="absolute w-full h-full flex flex-col items-center justify-center">
          <div className="p-1 m-1 bg-stone-800 hover:bg-stone-700 rounded-md" onClick={onView}>
            View
          </div>
          <div
            className="p-1 m-1 bg-stone-800 hover:bg-stone-700 rounded-md"
            onClick={(ev) => {
              ev.stopPropagation()
              onLoadWorkflow()
            }}
          >
            Load
          </div>
        </div>
      ) : undefined}
    </div>
  )
}

export default React.memo(GalleryComponent)

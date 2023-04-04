import { NodeComponent } from '@/components'
import { useAppStore } from '@/store'
import { Widget } from '@/types'
import React from 'react'
import { NodeProps } from 'reactflow'
import { shallow } from 'zustand/shallow'

const NodeContainer: React.FC<NodeProps<Widget>> = (props) => {
  const { progressBar, imagePreviews, onPreviewImage, onDuplicateNode, onDeleteNode, onModifyChange } = useAppStore(
    (st) => ({
      progressBar: st.nodeInProgress?.id === props.id ? st.nodeInProgress.progress : undefined,
      imagePreviews: st.graph[props.id]?.images?.flatMap((image) => {
        const index = st.gallery.findIndex((i) => i.image === image)
        return index !== -1 ? { image, index } : []
      }),
      onPreviewImage: st.onPreviewImage,
      onPropChange: st.onPropChange,
      onDuplicateNode: st.onDuplicateNode,
      onDeleteNode: st.onDeleteNode,
      onModifyChange: st.onModifyChange,
    }),
    shallow
  )
  return (
    <NodeComponent
      node={props}
      progressBar={progressBar}
      imagePreviews={imagePreviews}
      onPreviewImage={onPreviewImage}
      onDuplicateNode={onDuplicateNode}
      onDeleteNode={onDeleteNode}
      onModifyChange={onModifyChange}
    />
  )
}

export default React.memo(NodeContainer)

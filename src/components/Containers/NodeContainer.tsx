import { NodeComponent } from '@/components'
import { useAppStore } from '@/store'
import { Widget } from '@/types'
import React from 'react'
import { NodeProps } from 'reactflow'
import { shallow } from 'zustand/shallow'

const NodeContainer: React.FC<NodeProps<Widget>> = (props) => {
  const { progressBar, imagePreviews, onDuplicateNode, onDeleteNode, onModifyChange, getNodeFieldsData } = useAppStore(
    (st) => ({
      progressBar: st.nodeInProgress?.id === props.id ? st.nodeInProgress.progress : undefined,
      imagePreviews: st.graph[props.id]?.images?.map((image, index) => {
        return {
          image,
          index,
        }
      }),

      onPropChange: st.onPropChange,
      onDuplicateNode: st.onDuplicateNode,
      onDeleteNode: st.onDeleteNode,
      onModifyChange: st.onModifyChange,
      getNodeFieldsData: st.getNodeFieldsData,
    }),
    shallow
  )
  return (
    <NodeComponent
      node={props}
      progressBar={progressBar}
      imagePreviews={imagePreviews}
      onDuplicateNode={onDuplicateNode}
      onDeleteNode={onDeleteNode}
      onModifyChange={onModifyChange}
      getNodeFieldsData={getNodeFieldsData}
    />
  )
}

export default React.memo(NodeContainer)

import { NodePickerComponent } from '@/components'
import { useAppStore } from '@/store'
import React from 'react'
import { shallow } from 'zustand/shallow'

const NodePickerContainer: React.FC = () => {
  const { widgets, onAddNode } = useAppStore((st) => ({ widgets: st.widgets, onAddNode: st.onAddNode }), shallow)
  return <NodePickerComponent widgets={widgets} onAddNode={onAddNode} />
}

export default React.memo(NodePickerContainer)

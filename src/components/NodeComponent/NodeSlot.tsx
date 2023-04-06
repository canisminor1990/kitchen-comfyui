import { useAppStore } from '@/store'
import { isArray, startCase } from 'lodash-es'
import React from 'react'
import { Handle, HandleType, Position } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { Slot } from './style'

interface NodeSlotProps {
  label: string
  type: HandleType
  position: Position
  slotType?: string
  isRequired?: boolean
}

const NodeSlot: React.FC<NodeSlotProps> = ({ label, type, position, slotType, isRequired }) => {
  const { nodes } = useAppStore(
    (st) => ({
      nodes: st.nodes,
    }),
    shallow
  )

  let id = slotType
  if (isArray(slotType)) id = 'STRING'
  return (
    <Slot position={position} isRequired={isRequired ? 1 : 0}>
      <Handle
        id={label}
        type={type}
        position={position}
        isValidConnection={(e) => {
          try {
            // @ts-ignore
            let targetType = nodes.find((n) => n.id === e.target)?.data.input.required[e.targetHandle][0]
            if (isArray(targetType)) targetType = 'STRING'
            const sourceType = e.sourceHandle
            return targetType === sourceType
          } catch {
            return true
          }
        }}
      />
      <h5 title={id} style={{ marginBottom: 2 }}>
        {startCase(label.toLowerCase())}
      </h5>
    </Slot>
  )
}

export default NodeSlot

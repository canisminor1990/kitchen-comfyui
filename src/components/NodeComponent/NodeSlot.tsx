import { startCase } from 'lodash-es'
import React from 'react'
import { Handle, HandleType, Position } from 'reactflow'
import { Slot } from './style'

interface NodeSlotProps {
  id: string
  label: string
  type: HandleType
  position: Position
  slotType?: string

  isRequired?: boolean
}

const NodeSlot: React.FC<NodeSlotProps> = ({ id, label, type, position, slotType, isRequired }) => {
  return (
    <Slot position={position} isRequired={isRequired ? 1 : 0}>
      <Handle id={id} type={type} position={position} />
      <h5 title={slotType} style={{ marginBottom: 2 }}>
        {startCase(label.toLowerCase())}
      </h5>
    </Slot>
  )
}

export default NodeSlot

import { isArray, startCase } from 'lodash-es'
import React from 'react'
import { Handle, HandleType, Position } from 'reactflow'
import { Slot } from './style'

interface NodeSlotProps {
  label: string
  type: HandleType
  position: Position
  slotType?: string
  isRequired?: boolean
}

const NodeSlot: React.FC<NodeSlotProps> = ({ label, type, position, slotType, isRequired }) => {
  let id = slotType
  if (isArray(slotType)) id = 'STRING'
  return (
    <Slot position={position} isRequired={isRequired ? 1 : 0}>
      <Handle id={label} type={type} position={position} />
      <h5 title={id} style={{ marginBottom: 2 }}>
        {startCase(label.toLowerCase())}
      </h5>
    </Slot>
  )
}

export default NodeSlot

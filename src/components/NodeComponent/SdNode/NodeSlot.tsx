import { useAppStore } from '@/store'
import { Connection } from '@reactflow/core/dist/esm/types'
import { isArray, startCase } from 'lodash-es'
import React, { useCallback } from 'react'
import { Handle, HandleType, Position } from 'reactflow'
import { shallow } from 'zustand/shallow'
import { Slot } from '../style'

interface NodeSlotProps {
  label: string
  type: HandleType
  position: Position
  slotType?: string
  isRequired?: boolean
}

const NodeSlot: React.FC<NodeSlotProps> = ({ label, type, position, slotType, isRequired }) => {
  const { nodes } = useAppStore((state) => ({ nodes: state.nodes }), shallow)

  const handleValidCheck = useCallback(
    (connection: Connection) => {
      try {
        let targetType = nodes.find((n) => n.id === connection.target)?.data.input.required[
          String(connection.targetHandle)
        ][0]
        if (isArray(targetType)) targetType = 'STRING'
        const sourceType = connection.sourceHandle
        return targetType === sourceType
      } catch {
        return true
      }
    },
    [nodes]
  )

  return (
    <Slot position={position} isRequired={isRequired ? 1 : 0}>
      <Handle id={label} type={type} position={position} isValidConnection={handleValidCheck} />
      <h5 title={Array.isArray(slotType) ? 'STRING' : slotType} style={{ marginBottom: 2 }}>
        {startCase(label.toLowerCase())}
      </h5>
    </Slot>
  )
}

export default NodeSlot

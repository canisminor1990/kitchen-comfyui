import { SpaceCol } from '@/components/NodeComponent/style'
import React from 'react'
import { Position } from 'reactflow'
import NodeSlot from './NodeSlot'

interface NodeInputsProps {
  data: {
    name: string
    type: string
  }[]
}

const NodeInputs: React.FC<NodeInputsProps> = ({ data }) => {
  if (!data || data.length === 0) return <div />
  return (
    <SpaceCol>
      {data.map((item) => (
        <NodeSlot
          key={item.name}
          slotType={item.type}
          id={item.name}
          label={item.name}
          type="target"
          position={Position.Left}
          isRequired={true}
        />
      ))}
    </SpaceCol>
  )
}

export default React.memo(NodeInputs)

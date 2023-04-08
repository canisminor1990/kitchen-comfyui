import React from 'react'
import { Position } from 'reactflow'
import { SpaceCol } from '../style'
import NodeSlot from './NodeSlot'

interface NodeOutpusProps {
  data: string[]
}

const NodeOutputs: React.FC<NodeOutpusProps> = ({ data }) => {
  if (!data?.length) return <div />
  return (
    <SpaceCol>
      {data.map((item) => (
        <NodeSlot key={item} slotType={item} label={item} type="source" position={Position.Right} isRequired />
      ))}
    </SpaceCol>
  )
}

export default React.memo(NodeOutputs)

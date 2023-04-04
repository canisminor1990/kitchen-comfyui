import { SpaceCol } from '@/components/NodeComponent/style'
import React from 'react'
import { Position } from 'reactflow'
import NodeSlot from './NodeSlot'

interface NodeOutpusProps {
  data: string[]
}

const NodeOutpus: React.FC<NodeOutpusProps> = ({ data }) => {
  if (!data || data.length === 0) return <div />
  return (
    <SpaceCol>
      {data.map((item) => (
        <NodeSlot key={item} slotType={item} label={item} type="source" position={Position.Right} isRequired={true} />
      ))}
    </SpaceCol>
  )
}

export default React.memo(NodeOutpus)

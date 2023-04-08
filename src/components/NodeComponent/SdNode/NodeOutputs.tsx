import React from 'react'
import { Position } from 'reactflow'
import { SpaceCol } from '../style'
import NodeHandle from './NodeHandle'

interface NodeOutpusProps {
  data: string[]
}

const NodeOutputs: React.FC<NodeOutpusProps> = ({ data }) => {
  if (!data?.length) return <div />
  return (
    <SpaceCol>
      {data.map((item) => (
        <NodeHandle key={item} slotType={item} label={item} type="source" position={Position.Right} isRequired />
      ))}
    </SpaceCol>
  )
}

export default React.memo(NodeOutputs)

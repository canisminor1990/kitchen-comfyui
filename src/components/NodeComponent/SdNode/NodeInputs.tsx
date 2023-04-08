import React from 'react'
import { Position } from 'reactflow'
import { SpaceCol } from '../style'
import NodeHandle from './NodeHandle'

interface NodeInputsProps {
  data: {
    name: string
    type: string
  }[]
}

const NodeInputs: React.FC<NodeInputsProps> = ({ data }) => {
  if (!data?.length) return <div />
  return (
    <SpaceCol>
      {data.map(({ name, type }) => (
        <NodeHandle key={name} slotType={type} label={name} type="target" position={Position.Left} isRequired />
      ))}
    </SpaceCol>
  )
}

export default React.memo(NodeInputs)

import { InputComponent } from '@/components'
import NodeHandle from '@/components/NodeComponent/SdNode/NodeHandle'
import { Flow } from '@/types'
import React from 'react'
import { Position } from 'reactflow'

interface NodeParamsProps {
  nodeId: string
  data: {
    name: string
    type: string
    input: [Flow]
  }[]
}

const NodeParams: React.FC<NodeParamsProps> = ({ data, nodeId }) => {
  if (!data?.length) return null

  return (
    <div>
      {data.map(({ name, type, input }) => (
        <div key={name}>
          <NodeHandle slotType={type} label={name} type="target" position={Position.Left} isRequired={false} />
          <InputComponent name={name} id={nodeId} input={input} />
          <div style={{ height: 4 }} />
        </div>
      ))}
    </div>
  )
}

export default React.memo(NodeParams)

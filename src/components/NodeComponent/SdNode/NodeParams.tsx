import { InputComponent } from '@/components'
import NodeSlot from '@/components/NodeComponent/SdNode/NodeSlot'
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
  if (!data || data.length === 0) return null

  return (
    <div>
      {data.map((item) => (
        <div key={item.name}>
          <NodeSlot slotType={item.type} label={item.name} type="target" position={Position.Left} isRequired={false} />
          <InputComponent name={item.name} id={nodeId} input={item.input} />
          <div style={{ height: 4 }} />
        </div>
      ))}
    </div>
  )
}

export default React.memo(NodeParams)

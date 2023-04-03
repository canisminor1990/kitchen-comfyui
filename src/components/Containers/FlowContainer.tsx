import { NODE_IDENTIFIER, NodeContainer } from '@/components'
import { useAppStore } from '@/store'
import React from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'

const nodeTypes = { [NODE_IDENTIFIER]: NodeContainer }

const FlowContainer: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit } = useAppStore(
    (st) => ({
      nodes: st.nodes,
      edges: st.edges,
      onNodesChange: st.onNodesChange,
      onEdgesChange: st.onEdgesChange,
      onConnect: st.onConnect,
      onInit: st.onInit,
    }),
    shallow
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      nodeTypes={nodeTypes}
      deleteKeyCode={['Delete']}
      disableKeyboardA11y={true}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={() => {
        void onInit()
      }}
    >
      <Background variant={BackgroundVariant.Dots} />
      <Controls />
    </ReactFlow>
  )
}

export default FlowContainer

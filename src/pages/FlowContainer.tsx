import { ImageViewContainer, NODE_IDENTIFIER, NodeContainer } from '@/components'
import { useAppStore } from '@/store'
import React from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls, Panel } from 'reactflow'
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
      <Panel position="bottom-center">
        <ImageViewContainer />
      </Panel>
    </ReactFlow>
  )
}

export default FlowContainer

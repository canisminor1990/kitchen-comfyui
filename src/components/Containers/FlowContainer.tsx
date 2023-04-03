import { NODE_IDENTIFIER, NodeContainer } from '@/components'
import { useAppStore } from '@/store'
import { Connection } from '@reactflow/core/dist/esm/types'
import { Edge } from '@reactflow/core/dist/esm/types/edges'
import React, { useCallback, useRef } from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'

const nodeTypes = { [NODE_IDENTIFIER]: NodeContainer }

const FlowContainer: React.FC = () => {
  const edgeUpdateSuccessful = useRef(true)

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

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false
  }, [])

  const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
    edgeUpdateSuccessful.current = true
    onEdgesChange([
      {
        id: oldEdge.id,
        type: 'remove',
      },
    ])
    onConnect(newConnection)
  }, [])

  const onEdgeUpdateEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeUpdateSuccessful.current) {
      onEdgesChange([
        {
          id: edge.id,
          type: 'remove',
        },
      ])
    }
    edgeUpdateSuccessful.current = true
  }, [])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      snapToGrid
      nodeTypes={nodeTypes}
      deleteKeyCode={['Delete']}
      disableKeyboardA11y={true}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
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

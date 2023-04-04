import { NODE_IDENTIFIER, NodeComponent } from '@/components'
import { useAppStore } from '@/store'
import { Connection } from '@reactflow/core/dist/esm/types'
import { Edge } from '@reactflow/core/dist/esm/types/edges'
import { useTheme } from 'antd-style'
import React, { useCallback, useRef, useState } from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'

const nodeTypes = { [NODE_IDENTIFIER]: NodeComponent }

const FlowContainer: React.FC = () => {
  const theme = useTheme()
  const reactFlowWrapper = useRef(null)
  const edgeUpdateSuccessful = useRef(true)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit, onAddNode } = useAppStore(
    (st) => ({
      nodes: st.nodes,
      edges: st.edges,
      onNodesChange: st.onNodesChange,
      onEdgesChange: st.onEdgesChange,
      onConnect: st.onConnect,
      onInit: st.onInit,
      onAddNode: st.onAddNode,
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

  const onDragOver = useCallback((event: any) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault()
      // @ts-ignore
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const widget = JSON.parse(event.dataTransfer.getData('application/reactflow'))
      if (!widget) return
      // @ts-ignore
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      onAddNode({
        widget,
        position,
      })
    },
    [reactFlowInstance]
  )

  return (
    <ReactFlow
      id="floweditor"
      ref={reactFlowWrapper}
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
      onDrop={onDrop}
      onDragOver={onDragOver}
      onInit={(e: any) => {
        setReactFlowInstance(e)
        void onInit()
      }}
    >
      <Background variant={BackgroundVariant.Dots} />
      <Controls />
      <MiniMap
        nodeColor={(n) => {
          if (n.data.color) return n.data.color
          return theme.colorTextDescription
        }}
      />
    </ReactFlow>
  )
}

export default React.memo(FlowContainer)
import { NODE_IDENTIFIER, NodeComponent } from '@/components'
import { useAppStore } from '@/store'
import { Connection } from '@reactflow/core/dist/esm/types'
import { Edge } from '@reactflow/core/dist/esm/types/edges'
import { useTheme } from 'antd-style'
import { debounce } from 'lodash-es'
import React, { useCallback, useRef, useState } from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'

const nodeTypes = { [NODE_IDENTIFIER]: NodeComponent }

const FlowEditor: React.FC = () => {
  const theme = useTheme()
  const reactFlowWrapper: any = useRef(null)
  const edgeUpdateSuccessful = useRef(true)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const widget = JSON.parse(event.dataTransfer.getData('application/reactflow'))
      if (!widget) return
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

  const handleMouseMove = debounce((event: any) => {
    try {
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      setMousePosition(position)
    } catch {}
  }, 500)

  const handleCopy = () => {
    const selectedNodes = nodes.filter((n) => n.selected).map((n) => n.id)
    const selectedEdges = edges
      .filter((e) => selectedNodes.includes(e.target) && selectedNodes.includes(e.source))
      .map((e) => ({ source: e.source, target: e.target, sourceHandle: e.sourceHandle, targetHandle: e.targetHandle }))
    const copyData = { nodes: selectedNodes, edges: selectedEdges }
    navigator.clipboard.writeText(JSON.stringify(copyData))
    console.log('[Copy]', copyData)
  }

  const handlePaste = async () => {
    const clipboardData = await navigator.clipboard.readText()
    const pasteData = JSON.parse(clipboardData)
    console.log('[Paste]', pasteData)
  }

  const handleKeyDown = (event: any) => {
    if (event.ctrlKey && event.code === 'KeyC') {
      handleCopy()
    } else if (event.ctrlKey && event.code === 'KeyV') {
      handlePaste()
    }
  }

  return (
    <ReactFlow
      ref={reactFlowWrapper}
      nodes={nodes}
      edges={edges}
      fitView
      snapToGrid
      snapGrid={[24, 24]}
      minZoom={0.1}
      nodeTypes={nodeTypes}
      deleteKeyCode={['Delete', 'Backspace']}
      multiSelectionKeyCode={['Shift']}
      disableKeyboardA11y={true}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
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

export default React.memo(FlowEditor)

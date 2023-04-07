import { NODE_IDENTIFIER, NodeComponent } from '@/components'
import { useAppStore } from '@/store'
import { getPostion, getPostionCenter } from '@/utils'
import { Connection } from '@reactflow/core/dist/esm/types'
import { Edge } from '@reactflow/core/dist/esm/types/edges'
import { useTheme } from 'antd-style'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'

const nodeTypes = { [NODE_IDENTIFIER]: NodeComponent }

const FlowEditor: React.FC = () => {
  const theme = useTheme()
  const reactFlowRef: any = useRef(null)
  const edgeUpdateSuccessful = useRef(true)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit, onAddNode, onCopyNode, onPasteNode } =
    useAppStore(
      (st) => ({
        nodes: st.nodes,
        edges: st.edges,
        onNodesChange: st.onNodesChange,
        onEdgesChange: st.onEdgesChange,
        onConnect: st.onConnect,
        onInit: st.onInit,
        onAddNode: st.onAddNode,
        onCopyNode: st.onCopyNode,
        onPasteNode: st.onPasteNode,
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
      const widget = JSON.parse(event.dataTransfer.getData('application/reactflow'))
      if (!widget) return
      const position = getPostion(event.clientX, event.clientY, reactFlowRef, reactFlowInstance)
      onAddNode({
        widget,
        position,
      })
    },
    [reactFlowInstance]
  )

  const handleCopy = useCallback(() => {
    const copyData = onCopyNode()
    navigator.clipboard.writeText(JSON.stringify(copyData))
    console.log('[Copy]', copyData)
  }, [])

  const handlePaste = useCallback(async (instance: any) => {
    try {
      const clipboardData = await navigator.clipboard.readText()
      const pasteData = JSON.parse(clipboardData)
      const postion = getPostionCenter(reactFlowRef, instance)
      if (pasteData) onPasteNode(pasteData, postion)
      console.log('[Paste]', pasteData, postion)
    } catch (e) {
      console.log('[Paste]', e)
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: any) => {
      const ctrlKey = event.metaKey || (event.ctrlKey && !event.altKey)
      if (ctrlKey && event.code === 'KeyC') {
        handleCopy()
      } else if (ctrlKey && event.code === 'KeyV') {
        handlePaste(reactFlowInstance)
      }
    },
    [reactFlowInstance]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [reactFlowInstance])

  return (
    <ReactFlow
      ref={reactFlowRef}
      nodes={nodes}
      edges={edges}
      fitView
      snapToGrid
      snapGrid={[24, 24]}
      minZoom={0.05}
      nodeTypes={nodeTypes}
      deleteKeyCode={['Delete', 'Backspace']}
      multiSelectionKeyCode={['Shift']}
      panOnScroll
      zoomOnScroll={false}
      onlyRenderVisibleElements
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

export default React.memo(FlowEditor)

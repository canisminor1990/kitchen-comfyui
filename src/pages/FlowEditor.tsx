import { NODE_IDENTIFIER, NodeComponent } from '@/components'
import { useAppStore } from '@/store'
import { getPostion, getPostionCenter } from '@/utils'
import { Connection } from '@reactflow/core/dist/esm/types'
import { Edge } from '@reactflow/core/dist/esm/types/edges'
import { NodeDragHandler } from '@reactflow/core/dist/esm/types/nodes'
import { useTheme } from 'antd-style'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import { shallow } from 'zustand/shallow'

const nodeTypes = { [NODE_IDENTIFIER]: NodeComponent }

const FlowEditor: React.FC = () => {
  const theme = useTheme()
  const isWindows = navigator.platform.includes('Win')
  const reactFlowRef = useRef<any>(null)
  const edgeUpdateSuccessful = useRef(true)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  const {
    nodes,
    edges,
    onInit,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onAddNode,
    onCopyNode,
    onPasteNode,
    onSetNodesGroup,
    onDeleteNode,
    onCreateGroup,
  } = useAppStore(
    (st) => ({
      nodes: st.nodes,
      edges: st.edges,
      onInit: st.onInit,
      onNodesChange: st.onNodesChange,
      onEdgesChange: st.onEdgesChange,
      onConnect: st.onConnect,
      onAddNode: st.onAddNode,
      onCopyNode: st.onCopyNode,
      onPasteNode: st.onPasteNode,
      onSetNodesGroup: st.onSetNodesGroup,
      onDeleteNode: st.onDeleteNode,
      onCreateGroup: st.onCreateGroup,
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

  const onNodeDrag: NodeDragHandler = useCallback(
    (_, node, nodes) => {
      if (nodes.length > 2 || node.data.name !== 'Group') return
      const intersections = reactFlowInstance
        .getIntersectingNodes(node)
        .filter((n: any) => n.data.name !== 'Group' && (n.parentNode === node.id || !n.parentNode))
        .map((n: any) => n.id)
      onSetNodesGroup(intersections, node)
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
      const ctrlAction: any = {
        KeyC: () => handleCopy(),
        KeyV: () => handlePaste(reactFlowInstance),
        KeyG: () => onCreateGroup(),
      }
      if (ctrlKey) {
        const action = ctrlAction[event.code]
        if (action) action()
      } else if (event.code === 'Delete' || event.code === 'Backspace') {
        reactFlowInstance.getNodes().forEach((n: any) => n.selected && onDeleteNode(n.id))
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
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      ref={reactFlowRef}
      fitView
      snapToGrid
      snapGrid={[20, 20]}
      minZoom={0.05}
      multiSelectionKeyCode={['Shift']}
      deleteKeyCode={[]}
      panOnScroll={!isWindows}
      zoomOnScroll={isWindows}
      disableKeyboardA11y={true}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      onConnect={onConnect}
      onNodeDragStop={onNodeDrag}
      onNodeDragStart={onNodeDrag}
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

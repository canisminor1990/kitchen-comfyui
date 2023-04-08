import { NODE_IDENTIFIER } from '@/components'
import { AppState } from '@/store'
import { NodeItem } from '@/types'
import { applyNodeChanges, Node } from 'reactflow'
import { v4 as uuid } from 'uuid'
import { PersistedGraph } from './persistence'
import { fromWidget } from './widget'

interface nodePostion {
  x: number
  y: number
}

// 用于添加、更新和获取节点的函数
export function addNode(
  state: AppState,
  { widget, node, position, width, height, key, parentNode }: NodeItem,
  isCopy?: boolean
): AppState {
  const nextKey = key ? key : uuid()

  const id = isCopy ? String(key) : nextKey.toString()
  const maxZ = state.nodes
    .map((n) => n.zIndex ?? 0)
    .concat([0])
    .reduce((a, b) => Math.max(a, b))
  const item: Node = {
    id,
    data: { ...widget, ...node?.modify },
    dragHandle: '.ant-card-head',
    position: position ?? { x: 0, y: 0 },
    type: NODE_IDENTIFIER,
    zIndex: maxZ + 1,
    width,
    height,
    parentNode,
    style: {
      width,
      height,
    },
  }

  return {
    ...state,
    nodes: applyNodeChanges([{ type: 'add', item }], state.nodes),
    graph: { ...state.graph, [id]: node ?? fromWidget(widget) },
  }
}

export function updateNode(id: string, data: any, nodes: Node[]) {
  return nodes.map((n) => {
    if (n.id === id) n.data = { ...n.data, ...data }
    return n
  })
}

export function getPostion(x: number, y: number, reactFlowRef: any, reactFlowInstance: any) {
  const reactFlowBounds = reactFlowRef.current.getBoundingClientRect()
  return reactFlowInstance.project({
    x: x - reactFlowBounds.left,
    y: y - reactFlowBounds.top,
  })
}

export function getPostionCenter(reactFlowRef: any, reactFlowInstance: any) {
  const { x, y, zoom } = reactFlowInstance.getViewport()
  const width = reactFlowRef.current.offsetWidth
  const height = reactFlowRef.current.offsetHeight
  return {
    x: Math.floor((width / 2 - x) / zoom),
    y: Math.floor((height / 2 - y) / zoom),
  }
}

export function getTopLeftPoint(points: nodePostion[]): nodePostion {
  let topLeftPoint = points[0]
  for (let i = 1; i < points.length; i++) {
    const point = points[i]
    if (point.x < topLeftPoint.x || (point.x === topLeftPoint.x && point.y < topLeftPoint.y)) {
      topLeftPoint = point
    }
  }
  return topLeftPoint
}

export function copyNode(node: Node, basePositon: nodePostion, position: nodePostion) {
  return {
    ...node,
    position: {
      x: Math.floor(node.position.x - basePositon.x + position.x),
      y: Math.floor(node.position.y - basePositon.y + position.y),
    },
    key: uuid(),
  }
}

export function copyNodes(workflow: PersistedGraph, basePositon: nodePostion, position: nodePostion) {
  return Object.entries(workflow.data).reduce<{ data: { [id: string]: any }; idMap: { [id: string]: string } }>(
    (acc, [id, node]: any) => {
      const newNode = copyNode(node, basePositon, position)
      return {
        data: {
          ...acc.data,
          [newNode.key]: newNode,
        },
        idMap: {
          ...acc.idMap,
          [id]: newNode.key,
        },
      }
    },
    { data: {}, idMap: {} }
  )
}
export function copyConnections(workflow: PersistedGraph, idMap: { [id: string]: string }) {
  return {
    connections: workflow.connections.map((conn) => ({
      ...conn,
      source: idMap[conn.source],
      target: idMap[conn.target],
    })),
  }
}

import { NODE_IDENTIFIER } from '@/components'
import { AppState } from '@/store'
import { NodeItem } from '@/types'
import { applyNodeChanges, Node } from 'reactflow'
import { fromWidget } from './widget'

// 用于添加、更新和获取节点的函数
export function addNode(
  state: AppState,
  { widget, node, position, width, height, key }: NodeItem,
  isCopy?: boolean
): AppState {
  const nextKey = key !== undefined ? Math.max(key, state.counter + 1) : state.counter + 1

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
    style: {
      width,
      height,
    },
  }

  return {
    ...state,
    nodes: applyNodeChanges([{ type: 'add', item }], state.nodes),
    graph: { ...state.graph, [id]: node ?? fromWidget(widget) },
    counter: nextKey,
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

export function getTopLeftPoint(points: { x: number; y: number }[]): { x: number; y: number } {
  let topLeftPoint = points[0]
  for (let i = 1; i < points.length; i++) {
    const point = points[i]
    if (point.x < topLeftPoint.x || (point.x === topLeftPoint.x && point.y < topLeftPoint.y)) {
      topLeftPoint = point
    }
  }
  return topLeftPoint
}

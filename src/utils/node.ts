import { NODE_IDENTIFIER } from '@/components'
import { AppState } from '@/store'
import { NodeItem } from '@/types'
import { applyNodeChanges, Node } from 'reactflow'
import { fromWidget } from './widget'

// 用于添加、更新和获取节点的函数
export function addNode(state: AppState, { widget, node, position, width, height, key }: NodeItem): AppState {
  const nextKey = key !== undefined ? Math.max(key, state.counter + 1) : state.counter + 1

  const id = nextKey.toString()
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

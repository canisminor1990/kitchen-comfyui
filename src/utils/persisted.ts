import { PersistedGraph, PersistedNode } from '@/persistence'
import { AppState } from '@/store'
import { NodeId } from '@/types'
import { getValidConnections } from './connection'

// 用于将当前图形状态转换为持久状态的函数
export function toPersisted(state: AppState): PersistedGraph {
  const data: Record<NodeId, PersistedNode> = {}
  for (const node of state.nodes) {
    const value = state.graph[node.id]
    if (value !== undefined) {
      data[node.id] = { value, position: node.position }
      if (node.width) data[node.id].width = node.width
      if (node.height) data[node.id].height = node.height
    }
  }
  return {
    data,
    connections: getValidConnections(state),
  }
}

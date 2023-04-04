import { AppState } from '@/store'
import { Connection } from '@/types'
import { Connection as FlowConnection } from '@reactflow/core/dist/esm/types/general'
import { addEdge } from 'reactflow'

// 用于添加和获取连接的函数
export function addConnection(state: AppState, connection: FlowConnection): AppState {
  return { ...state, edges: addEdge(connection, state.edges) }
}

export function getValidConnections(state: AppState): Connection[] {
  return state.edges.flatMap((e) =>
    e.sourceHandle !== undefined && e.sourceHandle !== null && e.targetHandle !== undefined && e.targetHandle !== null
      ? [{ source: e.source, sourceHandle: e.sourceHandle, target: e.target, targetHandle: e.targetHandle }]
      : []
  )
}

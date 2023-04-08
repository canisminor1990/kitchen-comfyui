import { AppState } from '@/store'
import { Connection } from '@/types'
import { Connection as FlowConnection } from '@reactflow/core/dist/esm/types/general'
import { addEdge } from 'reactflow'

/**
 * @title 添加连接
 * @param state - 应用状态
 * @param connection - 流程连接
 * @returns 更新后的应用状态
 */
export const addConnection = (state: AppState, connection: FlowConnection): AppState => {
  const { edges } = state
  const { targetHandle, target } = connection

  return {
    ...state,
    edges: addEdge(
      connection,
      edges.filter((item) => !(item.targetHandle === targetHandle && item.target === target))
    ),
  }
}

/**
 * @title 获取有效连接
 * @param state - 应用状态
 * @returns 有效连接数组
 */
export const getValidConnections = (state: AppState): Connection[] =>
  state.edges.flatMap(({ source, sourceHandle, target, targetHandle }) =>
    sourceHandle?.length && targetHandle?.length ? [{ source, sourceHandle, target, targetHandle }] : []
  )

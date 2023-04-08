import { NODE_IDENTIFIER } from '@/components'
import { AppState } from '@/store'
import { NodeItem, NodePosition, PersistedGraph } from '@/types'
import { Node, applyNodeChanges } from 'reactflow'
import { v4 as uuid } from 'uuid'
import { fromWidget } from './widget'

/**
 * @title 添加节点
 * @param state - 应用状态对象
 * @param widget - 组件
 * @param node - 节点
 * @param position - 节点位置
 * @param width - 节点宽度
 * @param height - 节点高度
 * @param key - 节点唯一标识符
 * @param parentNode - 父节点
 * @returns 更新后的应用状态对象
 */
export const addNode = (
  state: AppState,
  { widget, node, position = { x: 0, y: 0 }, width, height, key, parentNode }: NodeItem
): AppState => {
  // 生成节点的唯一标识符
  const id = String(key ?? uuid())
  // 计算节点的 zIndex
  const zIndex =
    state.nodes
      .map((n) => n.zIndex ?? 0)
      .concat([0])
      .reduce((a, b) => Math.max(a, b)) + 1

  // 构造节点对象
  const item: Node = {
    id,
    type: NODE_IDENTIFIER,
    data: { ...widget, ...(node?.modify ?? {}) },
    dragHandle: '.ant-card-head',
    position,
    zIndex,
    width,
    height,
    parentNode,
    style: { width, height },
  }

  // 更新应用状态对象
  return {
    ...state,
    nodes: applyNodeChanges([{ type: 'add', item }], state.nodes),
    graph: { ...state.graph, [id]: node ?? fromWidget(widget) },
  }
}

/**
 * @title 更新节点
 * @param id - 节点唯一标识符
 * @param data - 更新的数据
 * @param nodes - 节点列表
 * @returns 更新后的节点列表
 */
export const updateNode = (id: string, data: any, nodes: Node[]) =>
  nodes.map((n) => {
    if (n.id === id) n.data = { ...n.data, ...data }
    return n
  })

/**
 * @title 获取节点的位置
 * @param x - 横坐标
 * @param y - 纵坐标
 * @param reactFlowRef - reactflow 的引用
 * @param reactFlowInstance - reactflow 实例
 * @returns 节点的位置
 */
export const getPostion = (x: number, y: number, reactFlowRef: any, reactFlowInstance: any) => {
  const reactFlowBounds = reactFlowRef.current.getBoundingClientRect()
  return reactFlowInstance.project({
    x: x - reactFlowBounds.left,
    y: y - reactFlowBounds.top,
  })
}

/**
 * @title 获取中心位置
 * @param reactFlowRef - reactflow 的引用
 * @param reactFlowInstance - reactflow 实例
 * @returns 中心位置
 */
export const getPostionCenter = (reactFlowRef: any, reactFlowInstance: any) => {
  const { x, y, zoom } = reactFlowInstance.getViewport()
  const width = reactFlowRef.current.offsetWidth
  const height = reactFlowRef.current.offsetHeight
  return {
    x: Math.floor((width / 2 - x) / zoom),
    y: Math.floor((height / 2 - y) / zoom),
  }
}

/**
 * @title 获取左上角的位置
 * @param points - 节点位置列表
 * @returns 左上角的位置
 */
export const getTopLeftPoint = (points: NodePosition[]): NodePosition => {
  let topLeftPoint = points[0]
  for (let i = 1; i < points.length; i++) {
    const point = points[i]
    if (point.x < topLeftPoint.x || (point.x === topLeftPoint.x && point.y < topLeftPoint.y)) {
      topLeftPoint = point
    }
  }
  return topLeftPoint
}

/**
 * @title 复制节点
 * @param node - 节点
 * @param basePositon - 基准位置
 * @param position - 新位置
 * @returns 复制后的节点
 */
export const copyNode = (node: Node, basePositon: NodePosition, position: NodePosition) => ({
  ...node,
  position: {
    x: Math.floor(node.position.x - basePositon.x + position.x),
    y: Math.floor(node.position.y - basePositon.y + position.y),
  },
  key: uuid(),
})

/**
 * @title 复制多个节点
 * @param workflow - 工作流
 * @param basePositon - 基准位置
 * @param position - 新位置
 * @returns 复制后的节点和 id 映射表
 */
export const copyNodes = (workflow: PersistedGraph, basePositon: NodePosition, position: NodePosition) =>
  Object.entries(workflow.data).reduce<{ data: { [id: string]: any }; idMap: { [id: string]: string } }>(
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

/**
 * @title 复制多个连接
 * @param workflow - 工作流
 * @param idMap - id 映射表
 * @returns 复制后的连接
 */
export const copyConnections = (workflow: PersistedGraph, idMap: { [id: string]: string }) => ({
  connections: workflow.connections.map((conn) => ({
    ...conn,
    source: idMap[conn.source],
    target: idMap[conn.target],
  })),
})

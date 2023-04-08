import { Connection, NodeId, NodePosition, SDNode } from '@/types'

/**
 * 持久化节点对象
 * @property value - SDNode 对象
 * @property position - 节点位置
 * @property width - 节点宽度
 * @property height - 节点高度
 * @property parentNode - 父节点 ID
 */
export interface PersistedNode {
  value: SDNode
  position: NodePosition
  width?: number
  height?: number
  parentNode?: string
}

/**
 * 持久化图对象
 * @property data - 节点数据
 * @property connections - 连线数据
 */
export interface PersistedGraph {
  data: Record<NodeId, PersistedNode>
  connections: Connection[]
}

/**
 * 本地持久化图对象
 * @property title - 标题
 * @property time - 时间戳
 * @property id - ID
 * @property graph - 持久化图对象
 */
export interface LocalPersistedGraphs {
  title: string
  time: number
  id: string
  graph: PersistedGraph
}

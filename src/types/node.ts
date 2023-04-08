import { StringifiableRecord } from 'query-string'
import { XYPosition } from 'reactflow'
import { NodeId, PropertyKey, WidgetKey } from './base'
import { Widget } from './widget'

/**
 * 节点位置
 */
export interface NodePosition {
  x: number
  y: number
}

/**
 * SDNode 修改属性
 * @property color - 颜色
 * @property nickname - 昵称
 */
export interface SDNodeModify {
  color?: string
  nickname?: string
}

/**
 * SDNode 对象
 * @property widget - Widget 键
 * @property fields - 属性字段
 * @property images - 图片列表
 * @property modify - 修改属性
 */
export interface SDNode {
  widget: WidgetKey
  fields: Record<PropertyKey, any>
  images?: ImageItem[]
  modify?: SDNodeModify
}

/**
 * 节点对象
 * @property widget - Widget 对象
 * @property node - SDNode 对象
 * @property position - 节点位置
 * @property key - 节点键
 * @property width - 节点宽度
 * @property height - 节点高度
 * @property parentNode - 父节点 ID
 */
export interface NodeItem {
  widget: Widget
  node?: SDNode
  position?: XYPosition
  key?: string
  width?: number
  height?: number
  parentNode?: string
}

/**
 * 图片对象
 * @property filename - 文件名
 * @property subfolder - 子文件夹名
 * @property type - 文件类型
 */
export interface ImageItem extends StringifiableRecord {
  filename: string
  subfolder?: string
  type?: string
}

/**
 * 节点执行进度对象
 * @property id - 节点 ID
 * @property progress - 进度值
 */
export interface NodeInProgress {
  id: NodeId
  progress: number
}

/**
 * Gallery Item 对象
 * @property prompt - 提示信息
 * @property image - 图片对象
 */
export interface GalleryItem {
  prompt?: string
  image: ImageItem
}

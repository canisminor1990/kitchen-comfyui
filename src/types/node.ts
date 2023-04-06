import { StringifiableRecord } from 'query-string'
import { XYPosition } from 'reactflow'
import { NodeId, PropertyKey, WidgetKey } from './base'
import { Widget } from './widget'

export interface SDNodeModify {
  color?: string
  nickname?: string
}

export interface SDNode {
  widget: WidgetKey
  fields: Record<PropertyKey, any>
  images?: ImageItem[]
  modify?: SDNodeModify
}

export interface NodeItem {
  widget: Widget
  node?: SDNode
  position?: XYPosition
  key?: number
  width?: number
  height?: number
}

// 3. SDNode 相关类型定义
export interface ImageItem extends StringifiableRecord {
  filename: string
  subfolder?: string
  type?: string
}

export interface SDNode {
  widget: WidgetKey
  fields: Record<PropertyKey, any>
  images?: ImageItem[]
}

export interface NodeInProgress {
  id: NodeId
  progress: number
}

export interface GalleryItem {
  prompt?: string
  image: ImageItem
}

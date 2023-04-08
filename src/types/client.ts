import { NodeId, PropertyKey, WidgetKey } from '@/types'

/**
 * Prompt 请求参数
 */
export interface PromptRequest {
  /**
   * 客户端 id
   */
  client_id?: string
  /**
   * 节点 id 和节点信息的映射
   */
  prompt: Record<NodeId, Node>
  /**
   * 额外的数据
   */
  extra_data?: ExtraData
}

/**
 * 额外数据
 */
export interface ExtraData {
  /**
   * png 信息
   */
  extra_pnginfo?: Record<string, any>
}

/**
 * Prompt 响应参数
 */
export interface PromptResponse {
  /**
   * 错误信息
   */
  error?: string
}

/**
 * 节点信息
 */
export interface Node {
  /**
   * 类型
   */
  class_type: WidgetKey
  /**
   * 输入属性和值的映射
   */
  inputs: Record<PropertyKey, any>
}

/**
 * 队列
 */
export interface Queue {
  /**
   * 运行中的队列项
   */
  queue_running: QueueItem[]
  /**
   * 等待中的队列项
   */
  queue_pending: QueueItem[]
}

/**
 * 队列项
 */
export type QueueItem = [number, number, Record<NodeId, Node>, { client_id?: string }]

/**
 * 历史记录
 */
export type History = Record<string, HistoryItem>

/**
 * 历史记录项
 */
export interface HistoryItem {
  /**
   * Prompt 请求参数
   */
  prompt: QueueItem
  /**
   * 节点 id 和输出属性及其值的映射
   */
  outputs: Record<NodeId, Record<PropertyKey, any>>
}

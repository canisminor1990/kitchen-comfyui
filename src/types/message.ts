import { NodeId } from './base'

/**
 * 消息类型定义
 */
export interface MessageType {
  /**
   * 状态消息
   * @property status - 状态信息
   * @property sid - Session ID
   */
  status: { status: { exec_info: { queue_remaining: number } }; sid?: string }
  /**
   * 正在执行消息
   * @property node - 正在执行的节点 ID
   */
  executing: { node?: NodeId }
  /**
   * 进度消息
   * @property value - 进度值
   * @property max - 最大值
   */
  progress: { value: number; max: number }
  /**
   * 执行完成消息
   * @property node - 执行完成的节点 ID
   * @property output - 输出值
   */
  executed: { node: NodeId; output: Record<string, any> }
}

/**
 * 消息对象
 * @typeparam K - 消息类型键
 */
export interface Message<K extends keyof MessageType> {
  /**
   * 消息类型
   */
  type: K
  /**
   * 消息数据
   */
  data: MessageType[K]
}

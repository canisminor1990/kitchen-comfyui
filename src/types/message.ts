import { NodeId } from './base'

export interface MessageType {
  status: { status: { exec_info: { queue_remaining: number } }; sid?: string }
  executing: { node?: NodeId }
  progress: { value: number; max: number }
  executed: { node: NodeId; output: Record<string, any> }
}

export interface Message<K extends keyof MessageType> {
  type: K
  data: MessageType[K]
}

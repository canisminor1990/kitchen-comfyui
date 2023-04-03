import { StringifiableRecord } from 'query-string'
import { XYPosition } from 'reactflow'

export type WidgetKey = string
export type PropertyKey = string
export type NodeId = string

export interface NodeItem {
  widget: Widget
  node?: SDNode
  position?: XYPosition
  key?: number
}

export interface SDNode {
  widget: WidgetKey
  fields: Record<PropertyKey, any>
  images?: ImageItem[]
}

export interface Widget {
  name: WidgetKey
  input: { required: Record<PropertyKey, InputData> }
  output: Flow[]
  category: string
}

export interface NodeInProgress {
  id: NodeId
  progress: number
}

export interface NumberProps<A> {
  default?: A
  min?: A
  max?: A
  randomizable?: boolean
}

export interface StringProps {
  multiline?: boolean
  dynamic_prompt?: boolean
}

export interface BoolProps {
  default?: boolean
}

export interface InputType {
  BOOL: [boolean, BoolProps]
  INT: [number, NumberProps<number>]
  FLOAT: [number, NumberProps<number>]
  STRING: [string, StringProps]
}

export type Flow = 'MODEL' | 'CONDITIONING' | 'CLIP' | 'IMAGE' | 'LATENT' | 'CONTROL_NET' | 'MASK'

export type Parameter<K extends keyof InputType> = [K, InputType[K][1]]

export type InputData = Parameter<keyof InputType> | [string[]] | [Flow]

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

export interface Connection {
  source: string
  sourceHandle: string
  target: string
  targetHandle: string
}

export interface GalleryItem {
  prompt?: string
  image: ImageItem
}

export interface ImageItem extends StringifiableRecord {
  filename: string
  subfolder: string
  type: string
}

export interface QueueItem {
  id: number
  prompts: string[]
  model?: string
}

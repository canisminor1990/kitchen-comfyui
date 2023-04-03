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

export const SDNode = {
  fromWidget(widget: Widget): SDNode {
    return { widget: widget.name, fields: Widget.getDefaultFields(widget) }
  },
}

export interface Widget {
  name: WidgetKey
  input: { required: Record<PropertyKey, Input> }
  output: Flow[]
  category: string
}

export const Widget = {
  getDefaultFields(widget: Widget): Record<PropertyKey, any> {
    const fields: Record<PropertyKey, any> = {}
    for (const [key, input] of Object.entries(widget.input.required)) {
      if (Input.isBool(input)) {
        fields[key] = input[1].default ?? false
      } else if (Input.isFloat(input)) {
        fields[key] = input[1].default ?? 0.0
      } else if (Input.isInt(input)) {
        fields[key] = input[1].default ?? 0
      } else if (Input.isString(input)) {
        fields[key] = ''
      } else if (Input.isList(input)) {
        fields[key] = input[0][0]
      }
    }
    return fields
  },
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

export type Input = Parameter<keyof InputType> | [string[]] | [Flow]

export const Input = {
  isBool(i: Input): i is Parameter<'BOOL'> {
    return i[0] === 'BOOL'
  },

  isInt(i: Input): i is Parameter<'INT'> {
    return i[0] === 'INT'
  },

  isFloat(i: Input): i is Parameter<'FLOAT'> {
    return i[0] === 'FLOAT'
  },

  isString(i: Input): i is Parameter<'STRING'> {
    return i[0] === 'STRING'
  },

  isList(i: Input): i is [string[]] {
    return Array.isArray(i[0])
  },

  isParameterOrList(i: Input): boolean {
    return Input.isBool(i) || Input.isInt(i) || Input.isFloat(i) || Input.isString(i) || Input.isList(i)
  },
}

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

export const Message = {
  isStatus(m: Message<keyof MessageType>): m is Message<'status'> {
    return m.type === 'status'
  },

  isExecuting(m: Message<keyof MessageType>): m is Message<'executing'> {
    return m.type === 'executing'
  },

  isProgress(m: Message<keyof MessageType>): m is Message<'progress'> {
    return m.type === 'progress'
  },

  isExecuted(m: Message<keyof MessageType>): m is Message<'executed'> {
    return m.type === 'executed'
  },
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

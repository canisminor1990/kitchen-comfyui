import { getQueue } from '@/client'
import { NODE_IDENTIFIER } from '@/components'
import { PersistedGraph, PersistedNode } from '@/persistence'
import type { AppState } from '@/store'
import { Connection, InputData, NodeId, NodeItem, Parameter, PropertyKey, QueueItem, SDNode, Widget } from '@/types'
import { Connection as FlowConnecton } from '@reactflow/core/dist/esm/types/general'
import { addEdge, applyNodeChanges } from 'reactflow'

export const checkInput = {
  isBool(i: InputData): i is Parameter<'BOOL'> {
    return i[0] === 'BOOL'
  },

  isInt(i: InputData): i is Parameter<'INT'> {
    return i[0] === 'INT'
  },

  isFloat(i: InputData): i is Parameter<'FLOAT'> {
    return i[0] === 'FLOAT'
  },

  isString(i: InputData): i is Parameter<'STRING'> {
    return i[0] === 'STRING'
  },

  isList(i: InputData): i is [string[]] {
    return Array.isArray(i[0])
  },

  isParameterOrList(i: InputData): boolean {
    return (
      checkInput.isBool(i) ||
      checkInput.isInt(i) ||
      checkInput.isFloat(i) ||
      checkInput.isString(i) ||
      checkInput.isList(i)
    )
  },
}

export function getDefaultFields(widget: Widget): Record<PropertyKey, any> {
  const fields: Record<PropertyKey, any> = {}
  for (const [key, input] of Object.entries(widget.input.required)) {
    if (checkInput.isBool(input)) {
      fields[key] = input[1].default ?? false
    } else if (checkInput.isFloat(input)) {
      fields[key] = input[1].default ?? 0.0
    } else if (checkInput.isInt(input)) {
      fields[key] = input[1].default ?? 0
    } else if (checkInput.isString(input)) {
      fields[key] = ''
    } else if (checkInput.isList(input)) {
      fields[key] = input[0][0]
    }
  }
  return fields
}

export function fromWidget(widget: Widget): SDNode {
  return { widget: widget.name, fields: getDefaultFields(widget) }
}

export function getValidConnections(state: AppState): Connection[] {
  return state.edges.flatMap((e) =>
    e.sourceHandle !== undefined && e.sourceHandle !== null && e.targetHandle !== undefined && e.targetHandle !== null
      ? [{ source: e.source, sourceHandle: e.sourceHandle, target: e.target, targetHandle: e.targetHandle }]
      : []
  )
}
export function addNode(state: AppState, { widget, node, position, key }: NodeItem): AppState {
  const nextKey = key !== undefined ? Math.max(key, state.counter + 1) : state.counter + 1

  const id = nextKey.toString()
  const maxZ = state.nodes
    .map((n) => n.zIndex ?? 0)
    .concat([0])
    .reduce((a, b) => Math.max(a, b))
  const item = {
    id,
    data: widget,
    position: position ?? { x: 0, y: 0 },
    type: NODE_IDENTIFIER,
    zIndex: maxZ + 1,
  }
  return {
    ...state,
    nodes: applyNodeChanges([{ type: 'add', item }], state.nodes),
    graph: { ...state.graph, [id]: node ?? fromWidget(widget) },
    counter: nextKey,
  }
}
export function addConnection(state: AppState, connection: FlowConnecton): AppState {
  return { ...state, edges: addEdge(connection, state.edges) }
}
export function toPersisted(state: AppState): PersistedGraph {
  const data: Record<NodeId, PersistedNode> = {}
  for (const node of state.nodes) {
    const value = state.graph[node.id]
    if (value !== undefined) {
      data[node.id] = { value, position: node.position }
    }
  }

  return {
    data,
    connections: getValidConnections(state),
  }
}

export async function getQueueItems(clientId?: string): Promise<QueueItem[]> {
  const history = await getQueue()
  // hacky way of getting the queue
  const queue = history.queue_running
    .concat(history.queue_pending)
    .filter((item) => {
      const client = item[3]
      return client.client_id === clientId
    })
    .map((item) => {
      const id = item[1]
      const graph = item[2]
      const prompts = Object.values(graph).flatMap((node) =>
        node.class_type === 'CLIPTextEncode' && node.inputs.text !== undefined ? [node.inputs.text] : []
      )
      const checkpoint = Object.values(graph).find((node) => node.class_type.startsWith('CheckpointLoader'))
      const model = checkpoint?.inputs?.ckpt_name
      return { id, prompts, model }
    })
  return queue
}

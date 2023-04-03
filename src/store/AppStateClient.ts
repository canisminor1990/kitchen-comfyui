import { getQueue } from '@/client'
import { NODE_IDENTIFIER } from '@/components'
import { PersistedGraph, PersistedNode } from '@/persistence'
import { Connection, NodeId, NodeItem, QueueItem, SDNode } from '@/types'
import { Connection as FlowConnecton } from '@reactflow/core/dist/esm/types/general'
import { addEdge, applyNodeChanges } from 'reactflow'
import type { AppState } from './index'

export default class AppStateClient {
  static getValidConnections(state: AppState): Connection[] {
    return state.edges.flatMap((e) =>
      e.sourceHandle !== undefined && e.sourceHandle !== null && e.targetHandle !== undefined && e.targetHandle !== null
        ? [{ source: e.source, sourceHandle: e.sourceHandle, target: e.target, targetHandle: e.targetHandle }]
        : []
    )
  }
  static addNode(state: AppState, { widget, node, position, key }: NodeItem): AppState {
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
      graph: { ...state.graph, [id]: node ?? SDNode.fromWidget(widget) },
      counter: nextKey,
    }
  }
  static addConnection(state: AppState, connection: FlowConnecton): AppState {
    return { ...state, edges: addEdge(connection, state.edges) }
  }
  static toPersisted(state: AppState): PersistedGraph {
    const data: Record<NodeId, PersistedNode> = {}
    for (const node of state.nodes) {
      const value = state.graph[node.id]
      if (value !== undefined) {
        data[node.id] = { value, position: node.position }
      }
    }

    return {
      data,
      connections: AppStateClient.getValidConnections(state),
    }
  }

  static async getQueueItems(clientId?: string): Promise<QueueItem[]> {
    const history = await getQueue()
    // hacky way of getting the queue
    const queue = history.queue_running
      .concat(history.queue_pending)
      .filter(([i, id, graph, client]) => client.client_id === clientId)
      .map(([i, id, graph]) => {
        const prompts = Object.values(graph).flatMap((node) =>
          node.class_type === 'CLIPTextEncode' && node.inputs.text !== undefined ? [node.inputs.text] : []
        )
        const checkpoint = Object.values(graph).find((node) => node.class_type.startsWith('CheckpointLoader'))
        const model = checkpoint?.inputs?.ckpt_name
        return { id, prompts, model }
      })
    return queue
  }
}

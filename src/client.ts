import type { NodeId, PersistedGraph, PersistedNode, Widget } from '@/types'
import { Connection } from '@/types'
import { Node, PromptRequest, PromptResponse, Queue } from '@/types/client'
import { checkInput, getBackendUrl } from '@/utils'

/**
 * 获取小部件库
 * @returns 小部件库
 */
export const getWidgetLibrary = async (): Promise<Record<string, Widget>> =>
  (await fetch(getBackendUrl('/object_info'))).json()

/**
 * 获取队列
 * @returns 队列
 */
export const getQueue = async (): Promise<Queue> => (await fetch(getBackendUrl('/queue'))).json()

/**
 * 从队列中删除项
 * @param id 队列项 id
 */
export const deleteFromQueue = async (id: number): Promise<void> => {
  await fetch(getBackendUrl('/queue'), {
    method: 'POST',
    body: JSON.stringify({ delete: [id] }),
  })
}

/**
 * 获取历史记录
 * @returns 历史记录
 */
export const getHistory = async (): Promise<History> => (await fetch(getBackendUrl('/history'))).json()

/**
 * 发送 Prompt 请求
 * @param prompt Prompt 请求参数
 * @returns Prompt 响应参数
 */
export const sendPrompt = async (prompt: PromptRequest): Promise<PromptResponse> => {
  const response = await fetch(getBackendUrl('/prompt'), {
    method: 'POST',
    body: JSON.stringify(prompt),
  })
  const error = response.status !== 200 ? await response.text() : undefined
  return { error }
}

/**
 * 重新连接
 * @param oldConnections Connection[] 旧连接
 * @returns Connection[] 新连接
 */
const reconnection = (oldConnections: Connection[]): Connection[] => {
  let connections: Connection[] = oldConnections.map((connect) => {
    if (connect.sourceHandle === '*') {
      const parent: any = oldConnections.find((c) => c.target === connect.source)
      return {
        ...connect,
        source: parent.source,
        sourceHandle: parent.sourceHandle,
      }
    }
    return connect
  })

  if (connections.find((c) => c.sourceHandle === '*')) {
    return reconnection(connections)
  } else {
    return connections.filter((c) => c.targetHandle !== '*')
  }
}

/**
 * 创建 Prompt 请求参数
 * @param {Props} props - 参数对象
 * @returns Prompt 请求参数
 */
export const createPrompt = ({
  graph,
  widgets,
  customWidgets,
  clientId,
}: {
  graph: PersistedGraph
  widgets: Record<string, Widget>
  customWidgets: string[]
  clientId?: string
}): PromptRequest => {
  const prompt: Record<NodeId, Node> = {}
  const data: Record<NodeId, PersistedNode> = {}

  Object.entries(graph.data).forEach(([id, node]) => {
    if (customWidgets.includes(node.value.widget)) return
    const fields = { ...node.value.fields }
    Object.entries(fields).forEach(([property, value]) => {
      const input = widgets[node.value.widget].input.required[property]
      if (checkInput.isInt(input) && input[1].randomizable && value === -1) {
        fields[property] = Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER)
      }
    })
    data[id] = {
      position: node.position,
      value: { ...node.value, fields },
    }
    prompt[id] = {
      class_type: node.value.widget,
      inputs: fields,
    }
  })

  // Reconnection

  let connections = reconnection(graph.connections)
  console.log(connections)

  connections.forEach((edge) => {
    const source = graph.data[edge.source]
    if (!source) return
    const outputIndex = widgets[source.value.widget].output.findIndex((f) => f === edge.sourceHandle)
    if (prompt[edge.target]) {
      prompt[edge.target].inputs[edge.targetHandle] = [edge.source, outputIndex]
    }
  })

  return {
    prompt,
    client_id: clientId,
    extra_data: { extra_pnginfo: { workflow: { connections, data } } },
  }
}

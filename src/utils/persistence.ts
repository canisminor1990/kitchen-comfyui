import { AppState } from '@/store'
import { LocalPersistedGraphs, NodeId, PersistedGraph, PersistedNode } from '@/types'
import { getValidConnections } from '@/utils/connection'
import defaultWorkflow from '../defaultWorkflow'

const TEMP_KEY = 'kitchen-flow-temp'
const LOCAL_KEY = 'kitchen-flow-local'

/**
 * 将应用状态转换为持久化状态
 * @param state - 应用状态
 * @returns 持久化状态
 */
export const toPersisted = (state: AppState): PersistedGraph => {
  const data: Record<NodeId, PersistedNode> = {}
  state.nodes.forEach((node) => {
    const value = state.graph[node.id]
    if (value !== undefined) {
      data[node.id] = { value, position: node.position }
      if (node.width) data[node.id].width = node.width
      if (node.height) data[node.id].height = node.height
      if (node.parentNode) data[node.id].parentNode = node.parentNode
    }
  })
  return {
    data,
    connections: getValidConnections(state),
  }
}

/**
 * 清除临时工作流
 */
export const cleanTempWorkflow = (): void => {
  try {
    localStorage.removeItem(TEMP_KEY)
  } catch (e) {
    console.log('[cleanTempWorkflow]', e)
  }
}

/**
 * 从 localStorage 中获取临时工作流
 * @returns 持久化状态或 null
 */
export const retrieveTempWorkflow = (): PersistedGraph | null => {
  const item = localStorage.getItem(TEMP_KEY)
  return item ? JSON.parse(item) : defaultWorkflow
}

/**
 * 将临时工作流保存到 localStorage 中
 * @param graph - 持久化状态
 */
export const saveTempWorkflow = (graph: PersistedGraph): void => {
  try {
    localStorage.setItem(TEMP_KEY, JSON.stringify(graph))
  } catch (e) {
    console.log('[saveTempWorkflow]', e)
  }
}

/**
 * 清除本地工作流
 */
export const cleanLocalWorkflows = (): void => {
  try {
    localStorage.removeItem(LOCAL_KEY)
  } catch (e) {
    console.log('[cleanLocalWorkflows]', e)
  }
}

/**
 * 从 localStorage 中获取本地工作流
 * @returns 持久化状态数组
 */
export const retrieveLocalWorkflows = (): LocalPersistedGraphs[] => {
  try {
    const item = localStorage.getItem(LOCAL_KEY)
    return item ? JSON.parse(item) : []
  } catch (e) {
    console.log('[retrieveLocalWorkflows]', e)
    return []
  }
}

/**
 * 从本地工作流中获取指定 ID 的工作流
 * @param id - 工作流 ID
 * @returns 持久化状态或 null
 */
export const getLocalWorkflowFromId = (id: string): PersistedGraph | null => {
  const workflows = retrieveLocalWorkflows()
  const workflow = workflows.find((item) => item.id === id)
  return workflow ? workflow.graph : null
}

/**
 * 从本地工作流中删除指定 ID 的工作流
 * @param id - 工作流 ID
 */
export const deleteLocalWorkflowFromId = (id: string) => {
  try {
    const localWorkflows = retrieveLocalWorkflows()
      .map((workflow) => {
        if (workflow.id !== id) return workflow
        return false
      })
      .filter(Boolean)
    localStorage.setItem(LOCAL_KEY, JSON.stringify(localWorkflows))
  } catch (e) {
    console.log('[deleteLocalWorkflowFromId]', e)
  }
}

/**
 * 将工作流保存到本地工作流中
 * @param graph - 持久化状态
 * @param title - 工作流标题
 */
export const saveLocalWorkflow = (graph: PersistedGraph, title?: string): void => {
  try {
    const localWorkflows = retrieveLocalWorkflows()
    const time = new Date().getTime()
    localWorkflows.push({
      title: title ? title : `Local-${time}`,
      time: time,
      id: `kitchen-${time}-${Math.floor(Math.random() * 1000000)}`,
      graph,
    })
    localStorage.setItem(LOCAL_KEY, JSON.stringify(localWorkflows))
  } catch (e) {
    console.log('[saveLocalWorkflow]', e)
  }
}

/**
 * 更新本地工作流中指定 ID 的工作流
 * @param id - 工作流 ID
 * @param modifyData - 修改的数据
 */
export const updateLocalWorkflow = (id: string, modifyData: { title?: string; graph?: PersistedGraph }): void => {
  try {
    const localWorkflows = retrieveLocalWorkflows().map((workflow) => {
      if (workflow.id !== id) return workflow
      return {
        ...workflow,
        ...modifyData,
        time: new Date().getTime(),
      }
    })
    localStorage.setItem(LOCAL_KEY, JSON.stringify(localWorkflows))
  } catch (e) {
    console.log('[updateLocalWorkflow]', e)
  }
}

/**
 * 从文件中读取工作流
 * @param file - 文件
 * @param callback - 读取完成后的回调函数
 */
export const readWorkflowFromFile = (file: File, callback: (workflow: PersistedGraph) => void): void => {
  try {
    const reader = new FileReader()
    if (file) {
      reader.readAsText(file)
      reader.addEventListener('load', (event) => {
        const result = event.target?.result
        if (typeof result === 'string') {
          callback(JSON.parse(result))
        }
      })
    }
  } catch (e) {
    console.log('[readWorkflowFromFile]', e)
  }
}

/**
 * 将工作流写入文件
 * @param workflow - 持久化状态
 * @param title - 工作流标题
 */
export const writeWorkflowToFile = (workflow: PersistedGraph, title?: string): void => {
  const blob = new Blob([JSON.stringify(workflow)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = title ? `${title}.json` : 'workflow.json'
  a.href = url
  a.click()
  URL.revokeObjectURL(url)
}

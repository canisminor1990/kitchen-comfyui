import { AppState } from '@/store'
import { Connection, NodeId, SDNode } from '@/types'
import { getValidConnections } from '@/utils/connection'
import defaultWorkflow from '../defaultWorkflow'

type Position = { x: number; y: number }

export interface PersistedNode {
  value: SDNode
  position: Position
  width?: number
  height?: number
  parentNode?: string
}

export interface PersistedGraph {
  data: Record<NodeId, PersistedNode>
  connections: Connection[]
}

export interface LocalPersistedGraphs {
  title: string
  time: number
  id: string
  graph: PersistedGraph
}

const TEMP_KEY = 'kitchen-flow-temp'
const LOCAL_KEY = 'kitchen-flow-local'

export function toPersisted(state: AppState): PersistedGraph {
  const data: Record<NodeId, PersistedNode> = {}
  for (const node of state.nodes) {
    const value = state.graph[node.id]
    if (value !== undefined) {
      data[node.id] = { value, position: node.position }
      if (node.width) data[node.id].width = node.width
      if (node.height) data[node.id].height = node.height
      if (node.parentNode) data[node.id].parentNode = node.parentNode
    }
  }
  return {
    data,
    connections: getValidConnections(state),
  }
}

// Temp Workflow
export function cleanTempWorkflow(): void {
  try {
    localStorage.removeItem(TEMP_KEY)
  } catch (e) {
    console.log('[cleanTempWorkflow]', e)
  }
}

export function retrieveTempWorkflow(): PersistedGraph | null {
  const item = localStorage.getItem(TEMP_KEY)
  return item ? JSON.parse(item) : defaultWorkflow
}

export function saveTempWorkflow(graph: PersistedGraph): void {
  try {
    localStorage.setItem(TEMP_KEY, JSON.stringify(graph))
  } catch (e) {
    console.log('[saveTempWorkflow]', e)
  }
}

// Local Workflow

export function cleanLocalWorkflows(): void {
  try {
    localStorage.removeItem(LOCAL_KEY)
  } catch (e) {
    console.log('[cleanLocalWorkflows]', e)
  }
}

export function retrieveLocalWorkflows(): LocalPersistedGraphs[] {
  try {
    const item = localStorage.getItem(LOCAL_KEY)
    return item ? JSON.parse(item) : []
  } catch (e) {
    console.log('[retrieveLocalWorkflows]', e)
    return []
  }
}

export function getLocalWorkflowFromId(id: string): PersistedGraph | null {
  const workflows = retrieveLocalWorkflows()
  const workflow = workflows.find((item) => item.id === id)
  return workflow ? workflow.graph : null
}

export function deleteLocalWorkflowFromId(id: string) {
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

export function saveLocalWorkflow(graph: PersistedGraph, title?: string): void {
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

export function updateLocalWorkflow(id: string, modifyData: { title?: string; graph?: PersistedGraph }): void {
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

export function readWorkflowFromFile(file: File, callback: (workflow: PersistedGraph) => void): void {
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

export function writeWorkflowToFile(workflow: PersistedGraph, title?: string): void {
  const blob = new Blob([JSON.stringify(workflow)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = title ? `${title}.json` : 'workflow.json'
  a.href = url
  a.click()
  URL.revokeObjectURL(url)
}

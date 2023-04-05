import { Connection, NodeId, SDNode } from '@/types'
import defaultWorkflow from './defaultWorkflow'

type Position = { x: number; y: number }

export interface PersistedNode {
  value: SDNode
  position: Position
  width?: number
  height?: number
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

// Temp Workflow
export function cleanTempWorkflow(): void {
  localStorage.removeItem(TEMP_KEY)
}

export function retrieveTempWorkflow(): PersistedGraph | null {
  const item = localStorage.getItem(TEMP_KEY)
  return item ? JSON.parse(item) : defaultWorkflow
}

export function saveTempWorkflow(graph: PersistedGraph): void {
  localStorage.setItem(TEMP_KEY, JSON.stringify(graph))
}

// Local Workflow

export function cleanLocalWorkflows(): void {
  localStorage.removeItem(LOCAL_KEY)
}

export function retrieveLocalWorkflows(): LocalPersistedGraphs[] {
  const item = localStorage.getItem(LOCAL_KEY)
  return item ? JSON.parse(item) : []
}

export function getLocalWorkflowFromId(id: string): PersistedGraph | null {
  const workflows = retrieveLocalWorkflows()
  const workflow = workflows.find((item) => item.id === id)
  return workflow ? workflow.graph : null
}

export function deleteLocalWorkflowFromId(id: string) {
  const localWorkflows = retrieveLocalWorkflows()
    .map((workflow) => {
      if (workflow.id !== id) return workflow
      return false
    })
    .filter(Boolean)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(localWorkflows))
}

export function saveLocalWorkflow(graph: PersistedGraph, title?: string): void {
  const localWorkflows = retrieveLocalWorkflows()
  const time = new Date().getTime()
  localWorkflows.push({
    title: title ? title : `Local-${time}`,
    time: time,
    id: `kitchen-${time}-${Math.floor(Math.random() * 1000000)}`,
    graph,
  })
  localStorage.setItem(LOCAL_KEY, JSON.stringify(localWorkflows))
}

export function updateLocalWorkflow(id: string, modifyData: { title?: string; graph?: PersistedGraph }) {
  const localWorkflows = retrieveLocalWorkflows().map((workflow) => {
    if (workflow.id !== id) return workflow
    return {
      ...workflow,
      ...modifyData,
      time: new Date().getTime(),
    }
  })
  localStorage.setItem(LOCAL_KEY, JSON.stringify(localWorkflows))
}

export function readWorkflowFromFile(file: File, callback: (workflow: PersistedGraph) => void): void {
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

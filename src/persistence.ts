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

const GRAPH_KEY = 'graph'

export function retrieveLocalWorkflow(): PersistedGraph | null {
  const item = localStorage.getItem(GRAPH_KEY)
  return item ? JSON.parse(item) : defaultWorkflow
}

export function saveLocalWorkflow(graph: PersistedGraph): void {
  localStorage.setItem(GRAPH_KEY, JSON.stringify(graph))
}

export function readWorkflowFromFile(
  event: React.ChangeEvent<HTMLInputElement>,
  callback: (workflow: PersistedGraph) => void
): void {
  const reader = new FileReader()
  const file = event.target?.files?.[0]
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

export function writeWorkflowToFile(workflow: PersistedGraph): void {
  const blob = new Blob([JSON.stringify(workflow)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = 'workflow.json'
  a.href = url
  a.click()
  URL.revokeObjectURL(url)
}

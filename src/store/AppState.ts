import { PersistedGraph } from '@/persistence'
import {
  GalleryItem,
  ImageItem,
  NodeId,
  NodeInProgress,
  NodeItem,
  PropertyKey,
  QueueItem,
  SDNode,
  Widget,
  WidgetKey,
} from '@/types'
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'

export type OnPropChange = (node: NodeId, property: PropertyKey, value: any) => void
export interface AppState {
  counter: number
  clientId?: string
  widgets: Record<WidgetKey, Widget>
  graph: Record<NodeId, SDNode>
  nodes: Node[]
  edges: Edge[]
  nodeInProgress?: NodeInProgress
  promptError?: string
  queue: QueueItem[]
  gallery: GalleryItem[]
  previewedImageIndex?: number
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: OnConnect
  onPropChange: OnPropChange
  onModifyChange: OnPropChange
  onUpdateNodes: (id: string, data: any) => void
  onAddNode: (nodeItem: NodeItem) => void
  onDeleteNode: (id: NodeId) => void
  onDuplicateNode: (id: NodeId) => void
  onSubmit: () => Promise<void>
  onDeleteFromQueue: (id: number) => Promise<void>
  onInit: () => Promise<void>
  onLoadWorkflow: (persisted: PersistedGraph) => void
  onSaveWorkflow: () => void
  onPersistLocal: () => void
  onNewClientId: (id: string) => void
  onQueueUpdate: () => Promise<void>
  onNodeInProgress: (id: NodeId, progress: number) => void
  onImageSave: (id: NodeId, images: ImageItem[]) => void
  onPreviewImage: (id: number) => void
}

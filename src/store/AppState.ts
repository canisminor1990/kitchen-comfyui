import {
  EdgeTypes,
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
import { PersistedGraph } from '@/utils'
import type { ThemeMode } from 'antd-style'
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'

export type OnPropChange = (node: NodeId, property: PropertyKey, value: any) => void
export interface AppState {
  /******************************************************
   ******************* initialState **********************
   ******************************************************/
  page: string
  counter: number
  widgets: Record<WidgetKey, Widget>
  graph: Record<NodeId, SDNode>
  nodes: Node[]
  edges: Edge[]
  queue: QueueItem[]
  gallery: GalleryItem[]
  themeMode: ThemeMode
  edgeType: EdgeTypes
  nodeInProgress?: NodeInProgress
  promptError?: string
  clientId?: string

  /******************************************************
   *********************** Base *************************
   ******************************************************/
  onSetPage: (value: string) => void
  onSetThemeMode: (type: ThemeMode) => void

  onRefresh: () => Promise<void>
  onInit: () => Promise<void>
  onNewClientId: (id: string) => void

  /******************************************************
   *********************** Node *************************
   ******************************************************/
  onSetNodesGroup: (childIds: NodeId[], groupNode: Node) => void
  onDetachNodesGroup: (childIds: NodeId[], groupNode: Node) => void
  onNodesChange: OnNodesChange
  onUpdateNodes: (id: string, data: any) => void
  onAddNode: (nodeItem: NodeItem) => void
  onDeleteNode: (id: NodeId) => void
  onDuplicateNode: (id: NodeId) => void
  onNodeInProgress: (id: NodeId, progress: number) => void
  onPropChange: OnPropChange
  onModifyChange: OnPropChange
  onGetNodeFieldsData: (id: NodeId, key: string) => any
  onCopyNode: () => PersistedGraph
  onPasteNode: (workflow: PersistedGraph, postion: { x: number; y: number }) => void
  /******************************************************
   *********************** Edges *************************
   ******************************************************/
  onEdgesChange: OnEdgesChange
  onEdgesAnimate: (animated: boolean) => void
  onEdgesType: (type: EdgeTypes) => void
  /******************************************************
   ********************* Connection ***********************
   ******************************************************/
  onConnect: OnConnect
  /******************************************************
   *********************** Image *************************
   ******************************************************/
  onImageSave: (id: NodeId, images: ImageItem[]) => void

  /******************************************************
   *********************** Queue *************************
   ******************************************************/
  onSubmit: () => Promise<void>
  onDeleteFromQueue: (id: number) => Promise<void>
  onQueueUpdate: () => Promise<void>

  /******************************************************
   ***************** Workflow && Persist *******************
   ******************************************************/
  onPersistTemp: () => void
  onSaveLocalWorkFlow: (title?: string) => void
  onLoadLocalWorkflow: (id: string) => void
  onUpdateLocalWorkFlowGraph: (id: string) => void
  onUpdateLocalWorkFlowTitle: (id: string, title: string) => void
  onLoadWorkflow: (persisted: PersistedGraph) => void
  onDownloadWorkflow: () => void
}

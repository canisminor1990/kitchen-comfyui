import { createPrompt, deleteFromQueue, getWidgetLibrary as getWidgets, sendPrompt } from '@/client'
import { getBackendUrl } from '@/config'
import { retrieveLocalWorkflow, saveLocalWorkflow, writeWorkflowToFile, type PersistedGraph } from '@/persistence'
import {
  ImageItem,
  NodeItem,
  SDNode,
  type GalleryItem,
  type NodeId,
  type NodeInProgress,
  type PropertyKey,
  type QueueItem,
  type Widget,
  type WidgetKey,
} from '@/types'
import exifr from 'exifr'
import {
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type Node,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from 'reactflow'
import { create } from 'zustand'
import AppStateClient from './AppStateClient'

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
  onPreviewImageNavigate: (next: boolean) => void
  onHideImagePreview: () => void
  onLoadImageWorkflow: (image: ImageItem) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  counter: 0,
  widgets: {},
  graph: {},
  nodes: [],
  edges: [],
  queue: [],
  gallery: [],
  onNodesChange: (changes) => {
    set((st) => ({ nodes: applyNodeChanges(changes, st.nodes) }))
  },
  onEdgesChange: (changes) => {
    set((st) => ({ edges: applyEdgeChanges(changes, st.edges) }))
  },
  onConnect: (connection) => {
    set((st) => AppStateClient.addConnection(st, connection))
  },
  onPropChange: (id, key, val) => {
    set((state) => ({
      graph: {
        ...state.graph,
        [id]: {
          ...state.graph[id],
          fields: {
            ...state.graph[id]?.fields,
            [key]: val,
          },
        },
      },
    }))
  },
  onPersistLocal: () => {
    saveLocalWorkflow(AppStateClient.toPersisted(get()))
  },
  onAddNode: (nodeItem) => {
    set((st) => AppStateClient.addNode(st, nodeItem))
  },
  onDeleteNode: (id) => {
    set(({ graph: { [id]: toDelete, ...graph }, nodes }) => ({
      // graph, // should work but currently buggy
      nodes: applyNodeChanges([{ type: 'remove', id }], nodes),
    }))
  },
  onDuplicateNode: (id) => {
    set((st) => {
      const item = st.graph[id]
      const node = st.nodes.find((n) => n.id === id)
      const position = node?.position
      const moved = position !== undefined ? { ...position, y: position.y + 100 } : undefined
      return AppStateClient.addNode(st, { widget: st.widgets[item.widget], node: item, position: moved })
    })
  },
  onSubmit: async () => {
    const state = get()
    const graph = AppStateClient.toPersisted(state)
    const res = await sendPrompt(createPrompt(graph, state.widgets, state.clientId))
    set({ promptError: res.error })
  },
  onDeleteFromQueue: async (id) => {
    await deleteFromQueue(id)
    await get().onQueueUpdate()
  },
  onInit: async () => {
    setInterval(() => get().onPersistLocal(), 5000)

    const widgets = await getWidgets()
    set({ widgets })
    get().onLoadWorkflow(retrieveLocalWorkflow() ?? { data: {}, connections: [] })
  },
  onLoadWorkflow: (workflow) => {
    set((st) => {
      let state: AppState = { ...st, nodes: [], edges: [], counter: 0, graph: {} }
      for (const [key, node] of Object.entries(workflow.data)) {
        const widget = state.widgets[node.value.widget]
        if (widget !== undefined) {
          state = AppStateClient.addNode(state, {
            widget,
            node: node.value,
            position: node.position,
            key: parseInt(key),
          })
        } else {
          console.warn(`Unknown widget ${node.value.widget}`)
        }
      }
      for (const connection of workflow.connections) {
        state = AppStateClient.addConnection(state, connection)
      }
      return state
    }, true)
  },
  onSaveWorkflow: () => {
    writeWorkflowToFile(AppStateClient.toPersisted(get()))
  },
  onNewClientId: (id) => {
    set({ clientId: id })
  },
  onQueueUpdate: async () => {
    set({ queue: await AppStateClient.getQueueItems(get().clientId) })
  },
  onNodeInProgress: (id, progress) => {
    set({ nodeInProgress: { id, progress } })
  },
  onImageSave: (id, images) => {
    set((st) => ({
      gallery: st.gallery.concat(images.map((image) => ({ image }))),
      graph: {
        ...st.graph,
        [id]: { ...st.graph[id], images },
      },
    }))
  },
  onPreviewImage: (index) => {
    set({ previewedImageIndex: index })
  },
  onPreviewImageNavigate: (next) => {
    set((st) => {
      if (st.previewedImageIndex === undefined) {
        return {}
      }
      const idx = next ? st.previewedImageIndex - 1 : st.previewedImageIndex + 1
      return idx < 0 || idx === st.gallery.length ? {} : { previewedImageIndex: idx }
    })
  },
  onHideImagePreview: () => {
    set({ previewedImageIndex: undefined })
  },
  onLoadImageWorkflow: (image) => {
    void exifr.parse(getBackendUrl(`/view/${image}`)).then((res) => {
      get().onLoadWorkflow(JSON.parse(res.workflow))
    })
  },
}))

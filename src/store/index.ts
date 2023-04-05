import { createPrompt, deleteFromQueue, getWidgetLibrary as getWidgets, sendPrompt } from '@/client'
import {
  addConnection,
  addNode,
  getLocalWorkflowFromId,
  getQueueItems,
  retrieveTempWorkflow,
  saveLocalWorkflow,
  saveTempWorkflow,
  toPersisted,
  updateLocalWorkflow,
  updateNode,
  writeWorkflowToFile,
} from '@/utils'
import { applyEdgeChanges, applyNodeChanges } from 'reactflow'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AppState } from './AppState'
export * from './AppState'

export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    /******************************************************
     ******************* initialState **********************
     ******************************************************/
    page: 'flow',
    counter: 0,
    widgets: {},
    graph: {},
    nodes: [],
    edges: [],
    queue: [],
    gallery: [],
    themeMode: 'auto',
    edgeType: 'default',
    nodeInProgress: undefined,
    promptError: undefined,
    clientId: undefined,

    /******************************************************
     *********************** Base *************************
     ******************************************************/

    onSetPage: (value) => {
      set({ page: value }, false, 'onSetPage')
    },

    onSetThemeMode: (type) => {
      set({ themeMode: type }, false, 'onSetThemeMode')
    },

    onNewClientId: (id) => {
      set({ clientId: id }, false, 'onNewClientId')
    },

    onInit: async () => {
      setInterval(() => get().onPersistTemp(), 5000)
      const widgets = await getWidgets()
      set({ widgets }, false, 'onInit')
      get().onLoadWorkflow(retrieveTempWorkflow() ?? { data: {}, connections: [] })
    },

    /******************************************************
     *********************** Node *************************
     ******************************************************/

    onNodesChange: (changes) => {
      set((st) => ({ nodes: applyNodeChanges(changes, st.nodes) }), false, 'onNodesChange')
    },

    onUpdateNodes: (id, data) => {
      set((st) => ({ nodes: updateNode(id, data, st.nodes) }), false, 'onUpdateNodes')
    },

    onAddNode: (nodeItem) => {
      set((st) => addNode(st, nodeItem), false, 'onAddNode')
    },

    onDeleteNode: (id) => {
      set(
        ({ graph: { [id]: _toDelete }, nodes }) => ({
          // graph, // should work but currently buggy
          nodes: applyNodeChanges([{ type: 'remove', id }], nodes),
        }),
        false,
        'onDeleteNode'
      )
    },

    onDuplicateNode: (id) => {
      set(
        (st) => {
          const item = st.graph[id]
          const node = st.nodes.find((n) => n.id === id)
          const position = node?.position
          const moved = position !== undefined ? { ...position, y: position.y + 100 } : undefined
          return addNode(st, { widget: st.widgets[item.widget], node: item, position: moved })
        },
        false,
        'onDuplicateNode'
      )
    },

    onNodeInProgress: (id, progress) => {
      set({ nodeInProgress: { id, progress } }, false, 'onNodeInProgress')
    },

    onPropChange: (id, key, val) => {
      set(
        (state) => {
          state.onUpdateNodes(id, { [key]: val })
          return {
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
          }
        },
        false,
        'onPropChange'
      )
    },

    onModifyChange: (id, key, val) => {
      set(
        (state) => {
          state.onUpdateNodes(id, { [key]: val })
          return {
            graph: {
              ...state.graph,
              [id]: {
                ...state.graph[id],
                modify: {
                  ...state.graph[id]?.modify,
                  [key]: val,
                },
              },
            },
          }
        },
        false,
        'onModifyChange'
      )
    },

    getNodeFieldsData: (id, key) => {
      try {
        return get()?.graph[id]?.fields[key]
      } catch (e) {
        console.error(e)
      }
    },

    /******************************************************
     *********************** Edges *************************
     ******************************************************/

    onEdgesChange: (changes) => {
      set((st) => ({ edges: applyEdgeChanges(changes, st.edges) }), false, 'onEdgesChange')
    },

    onEdgesAnimate: (animated) => {
      set(
        (st) => ({
          edges: st.edges.map((e) => ({
            ...e,
            animated,
          })),
        }),
        false,
        'onEdgesAnimate'
      )
    },

    onEdgesType: (type) => {
      set(
        (st) => ({
          edgeType: type,
          edges: st.edges.map((e) => ({
            ...e,
            type,
          })),
        }),
        false,
        'onEdgesType'
      )
    },

    /******************************************************
     ********************* Connection ***********************
     ******************************************************/

    onConnect: (connection) => {
      set((st) => addConnection(st, connection), false, 'onConnect')
    },

    /******************************************************
     *********************** Image *************************
     ******************************************************/

    onImageSave: (id, images) => {
      set(
        (st) => ({
          gallery: st.gallery.concat(images.map((image) => ({ image }))),
          graph: {
            ...st.graph,
            [id]: { ...st.graph[id], images },
          },
        }),
        false,
        'onImageSave'
      )
    },

    /******************************************************
     *********************** Queue *************************
     ******************************************************/

    onSubmit: async () => {
      const state = get()
      const graph = toPersisted(state)
      const res = await sendPrompt(createPrompt(graph, state.widgets, state.clientId))
      set({ promptError: res.error, counter: state.counter + 1 }, false, 'onSubmit')
    },

    onDeleteFromQueue: async (id) => {
      await deleteFromQueue(id)
      await get().onQueueUpdate()
    },

    onQueueUpdate: async () => {
      set({ queue: await getQueueItems(get().clientId) }, false, 'onQueueUpdate')
    },

    /******************************************************
     ***************** Workflow && Persist *******************
     ******************************************************/

    onPersistTemp: () => {
      saveTempWorkflow(toPersisted(get()))
    },

    onSaveLocalWorkFlow: (title) => {
      saveLocalWorkflow(toPersisted(get()), title)
    },

    onLoadLocalWorkflow: (id) => {
      const workflow = getLocalWorkflowFromId(id)
      if (workflow) get().onLoadWorkflow(workflow)
    },

    onUpdateLocalWorkFlowGraph: (id) => {
      updateLocalWorkflow(id, { graph: toPersisted(get()) })
    },

    onUpdateLocalWorkFlowTitle: (id, title) => {
      updateLocalWorkflow(id, { title })
    },

    onLoadWorkflow: (workflow) => {
      set(
        (st) => {
          let state: AppState = { ...st, nodes: [], edges: [], counter: 0, graph: {} }
          for (const [key, node] of Object.entries(workflow.data)) {
            const widget = state.widgets[node.value.widget]
            if (widget !== undefined) {
              state = addNode(state, {
                widget,
                node: node.value,
                position: node.position,
                width: node.width,
                height: node.height,
                key: parseInt(key),
              })
            } else {
              console.warn(`Unknown widget ${node.value.widget}`)
            }
          }
          for (const connection of workflow.connections) {
            state = addConnection(state, connection)
          }
          return state
        },
        true,
        'onLoadWorkflow'
      )
    },

    onDownloadWorkflow: () => {
      writeWorkflowToFile(toPersisted(get()))
    },
  }))
)

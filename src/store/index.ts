import { createPrompt, deleteFromQueue, getWidgetLibrary as getWidgets, sendPrompt } from '@/client'
import type { PersistedGraph } from '@/types'
import {
  addConnection,
  addNode,
  copyConnections,
  copyNodes,
  getLocalWorkflowFromId,
  getQueueItems,
  getTopLeftPoint,
  retrieveTempWorkflow,
  saveLocalWorkflow,
  saveTempWorkflow,
  toPersisted,
  updateLocalWorkflow,
  updateNode,
  writeWorkflowToFile,
} from '@/utils'
import { applyEdgeChanges, applyNodeChanges } from 'reactflow'
import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AppState } from './AppState'
import customWidgets from './customWidgets'
export * from './AppState'

export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    /******************************************************
     ******************* initialState **********************
     ******************************************************/
    page: 'flow',
    counter: 0,
    widgets: {},
    customWidgets: Object.keys(customWidgets),
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

    onRefresh: async () => {
      const widgets = await getWidgets()
      set({ widgets: { ...customWidgets, ...widgets } }, false, 'onRefresh')
    },

    onInit: async () => {
      setInterval(() => get().onPersistTemp(), 5000)
      const widgets = await getWidgets()
      set({ widgets: { ...customWidgets, ...widgets } }, false, 'onInit')
      get().onLoadWorkflow(retrieveTempWorkflow() ?? { data: {}, connections: [] })
    },

    /******************************************************
     *********************** Node *************************
     ******************************************************/
    onCreateGroup: () => {
      const { nodes, onDetachGroup } = get()
      const childNodes = nodes.filter((n) => n.selected).map((n) => onDetachGroup(n))
      if (childNodes.length < 1) return
      let left = Infinity
      let right = 0
      let top = Infinity
      let bottom = 0

      childNodes.forEach(({ position: { x, y }, width, height }) => {
        left = Math.min(left, x)
        right = Math.max(right, x + Number(width))
        top = Math.min(top, y)
        bottom = Math.max(bottom, y + Number(height))
      })

      const newGroupNode = {
        widget: customWidgets.Group,
        position: { x: left - 40, y: top - 60 },
        width: right - left + 80,
        height: bottom - top + 100,
        key: uuid(),
      }

      set((st) => addNode(st, newGroupNode), false, 'onCreateGroup')
    },

    onSetNodesGroup: (childIds, groupNode) => {
      set((st) => ({
        nodes: st.nodes.map((n) => {
          if (childIds.includes(n.id)) {
            if (n.parentNode === groupNode.id) return n
            n.parentNode = groupNode.id
            n.position.x = n.position.x - groupNode.position.x
            n.position.y = n.position.y - groupNode.position.y
          } else if (n.parentNode === groupNode.id) {
            n.parentNode = undefined
            n.position.x = n.position.x + groupNode.position.x
            n.position.y = n.position.y + groupNode.position.y
          }
          return n
        }),
      }))
    },

    onDetachGroup: (node) => {
      if (!node.parentNode) return node
      const nodes = get().nodes
      const groupNode = nodes.find((n) => n.id === node.parentNode)
      return {
        ...node,
        parentNode: undefined,
        position: {
          x: node.position.x + Number(groupNode?.position.x),
          y: node.position.y + Number(groupNode?.position.y),
        },
      }
    },

    onDetachNodesGroup: (childIds, groupNode) => {
      set((st) => ({
        nodes: st.nodes.map((n) => {
          if (childIds.includes(n.id)) {
            n.parentNode = undefined
            n.position.x = n.position.x + groupNode.position.x
            n.position.y = n.position.y + groupNode.position.y
          }
          return n
        }),
      }))
    },

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
      let nodes = get().nodes
      const node: any = nodes.find((n) => n.id === id)
      const childIds = nodes.filter((n) => n.parentNode === id).map((n) => n.id)
      get().onDetachNodesGroup(childIds, node)
      set(
        (st) => ({
          nodes: applyNodeChanges([{ type: 'remove', id }], st.nodes),
        }),
        false,
        'onDeleteNode'
      )
    },

    onDuplicateNode: (id) => {
      set(
        (st) => {
          const { graph, nodes, widgets } = st
          const item = graph[id]
          const node = nodes.find((n) => n.id === id)
          const position = node?.position
          const moved = position ? { ...position, y: position.y + (node.height || 100) + 24 } : undefined
          const nodeData = {
            widget: widgets[item.widget],
            node: item,
            position: moved,
            ...(node?.width && { width: node.width }),
            ...(node?.height && { height: node.height }),
          }
          return addNode(st, nodeData)
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
        (st) => {
          st.onUpdateNodes(id, { [key]: val })
          const updatedFields = {
            ...st.graph[id]?.fields,
            [key]: val,
          }
          const updatedNode = {
            ...st.graph[id],
            fields: updatedFields,
          }
          const updatedGraph = {
            ...st.graph,
            [id]: updatedNode,
          }
          return {
            ...st,
            graph: updatedGraph,
          }
        },
        false,
        'onPropChange'
      )
    },

    onModifyChange: (id, key, val) => {
      set(
        (st) => {
          st.onUpdateNodes(id, { [key]: val })
          const updatedModify = {
            ...st.graph[id]?.modify,
            [key]: val,
          }
          const updatedNode = {
            ...st.graph[id],
            modify: updatedModify,
          }
          const updatedGraph = {
            ...st.graph,
            [id]: updatedNode,
          }
          return {
            ...st,
            graph: updatedGraph,
          }
        },
        false,
        'onModifyChange'
      )
    },

    onGetNodeFieldsData: (id, key) => {
      try {
        return get()?.graph[id]?.fields[key]
      } catch (e) {
        console.error(e)
      }
    },

    onCopyNode: () => {
      const nodes = get().nodes
      const selectedNodes = nodes.filter((n) => n.selected).map((n) => n.id)
      const workflow = toPersisted(get())
      const workflowData: any = {}
      selectedNodes.forEach((id) => {
        const selectNode = workflow.data[id]
        if (selectNode.parentNode) {
          const groupNode = nodes.find((n) => n.id === selectNode.parentNode)
          workflowData[id] = {
            ...selectNode,
            parentNode: undefined,
            position: {
              x: selectNode.position.x + Number(groupNode?.position.x),
              y: selectNode.position.y + Number(groupNode?.position.y),
            },
          }
        } else {
          workflowData[id] = selectNode
        }
      })
      workflow.data = workflowData
      workflow.connections = workflow.connections.filter(
        (e) => selectedNodes.includes(e.target) && selectedNodes.includes(e.source)
      )
      return workflow
    },

    onPasteNode: (workflow, position) => {
      const basePositon = getTopLeftPoint(Object.values(workflow.data).map((item) => item.position))
      const { data, idMap } = copyNodes(workflow, basePositon, position)
      const connections = copyConnections(workflow, idMap)
      const newWorkflow: PersistedGraph = { data, ...connections }
      set(
        (st) =>
          Object.entries(newWorkflow.data).reduce((state, [key, node]) => {
            const widget = state.widgets[node.value.widget]
            if (widget) {
              return addNode(state, {
                widget,
                node: node.value,
                position: node.position,
                width: node.width,
                height: node.height,
                parentNode: node.parentNode,
                key,
              })
            }
            console.warn(`Unknown widget ${node.value.widget}`)
            return state
          }, connections.connections.reduce(addConnection, st)),
        true,
        'onPasteNode'
      )
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
      const res = await sendPrompt(
        createPrompt({ graph, widgets: state.widgets, customWidgets: state.customWidgets, clientId: state.clientId })
      )
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
          const { widgets } = st
          let state: AppState = { ...st, nodes: [], edges: [], counter: 0, graph: {} }
          Object.entries(workflow.data).forEach(([key, node]) => {
            const widget = widgets?.[node.value.widget]
            if (widget) {
              state = addNode(state, {
                widget,
                node: node.value,
                position: node.position,
                width: node.width,
                height: node.height,
                key,
                parentNode: node.parentNode,
              })
            } else {
              console.warn(`Unknown widget ${node.value.widget}`)
            }
          })
          workflow.connections.forEach((connection) => {
            state = addConnection(state, connection)
          })
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

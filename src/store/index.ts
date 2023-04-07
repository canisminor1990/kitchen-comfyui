import { createPrompt, deleteFromQueue, getWidgetLibrary as getWidgets, sendPrompt } from '@/client'
import { Widget, WidgetKey } from '@/types'
import {
  PersistedGraph,
  addConnection,
  addNode,
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
export * from './AppState'

const defaultWidgets: Record<WidgetKey, Widget> = {
  Group: {
    input: { required: {} },
    output: [],
    output_name: [],
    name: 'Group',
    category: 'Utils',
  },
}

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

    onRefresh: async () => {
      const widgets = await getWidgets()
      set({ widgets: { ...widgets, ...defaultWidgets } }, false, 'onRefresh')
    },

    onInit: async () => {
      setInterval(() => get().onPersistTemp(), 5000)
      const widgets = await getWidgets()
      set({ widgets: { ...widgets, ...defaultWidgets } }, false, 'onInit')
      get().onLoadWorkflow(retrieveTempWorkflow() ?? { data: {}, connections: [] })
    },

    /******************************************************
     *********************** Node *************************
     ******************************************************/
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
          const moved = position !== undefined ? { ...position, y: position.y + (node?.height || 100) + 24 } : undefined
          const nodeData: any = { widget: st.widgets[item.widget], node: item, position: moved }
          if (node?.width) nodeData.width = node.width
          if (node?.height) nodeData.height = node.height
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

    onGetNodeFieldsData: (id, key) => {
      try {
        return get()?.graph[id]?.fields[key]
      } catch (e) {
        console.error(e)
      }
    },

    onCopyNode: () => {
      const selectedNodes = get()
        .nodes.filter((n) => n.selected)
        .map((n) => n.id)
      const workflow = toPersisted(get())
      const workflowData: any = {}
      selectedNodes.forEach((id) => {
        workflowData[id] = workflow.data[id]
      })
      workflow.data = workflowData
      workflow.connections = workflow.connections.filter(
        (e) => selectedNodes.includes(e.target) && selectedNodes.includes(e.source)
      )
      return workflow
    },

    onPasteNode: (workflow, position) => {
      const nodes = get().nodes
      const basePositon = getTopLeftPoint(Object.values(workflow.data).map((item) => item.position))
      const idMap: { [id: string]: string } = {} // 存储原始节点 id 和新节点 id 的映射关系
      const newWorkflow: PersistedGraph = {
        data: {},
        connections: [],
      }

      // 复制节点并更新 id
      Object.entries(workflow.data).forEach(([id, node]) => {
        const newNode = {
          ...node,
          position: {
            x: Math.floor(node.position.x - basePositon.x + position.x),
            y: Math.floor(node.position.y - basePositon.y + position.y),
          },
          key: uuid(), // 使用 uuid 生成新的唯一标识符
        }
        if (node.parentNode) {
          if (!Object.keys(workflow.data).includes(node.parentNode)) {
            newNode.parentNode = undefined
            const groupNode = nodes.find((n) => n.id === node.parentNode)
            if (groupNode) {
              newNode.position.x = newNode.position.x + groupNode.position.x
              newNode.position.y = newNode.position.y + groupNode.position.y
            }
          } else {
            newNode.position = node.position
          }
        }
        newWorkflow.data[newNode.key] = newNode
        idMap[id] = newNode.key // 记录原始节点 id 和新节点 id 的映射关系
      })

      Object.keys(newWorkflow.data).forEach((key) => {
        const parentNodeId = newWorkflow.data[key]?.parentNode
        if (parentNodeId) newWorkflow.data[key].parentNode = idMap[parentNodeId]
      })

      // 更新 connection 中的 source 和 target
      workflow.connections.forEach((conn) => {
        const newConn = {
          ...conn,
          source: idMap[conn.source],
          target: idMap[conn.target],
        }
        newWorkflow.connections.push(newConn)
      })

      // 将新的 workflow 合并到状态管理器中
      set(
        (st) => {
          let state: AppState = st
          for (const [key, node] of Object.entries(newWorkflow.data)) {
            const widget = state.widgets[node.value.widget]
            if (widget !== undefined) {
              state = addNode(
                state,
                {
                  widget,
                  node: node.value,
                  position: node.position,
                  width: node.width,
                  height: node.height,
                  parentNode: node.parentNode,
                  key,
                },
                true
              )
            } else {
              console.warn(`Unknown widget ${node.value.widget}`)
            }
          }
          for (const connection of newWorkflow.connections) {
            state = addConnection(state, connection)
          }
          return state
        },
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
                key: key,
                parentNode: node.parentNode,
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

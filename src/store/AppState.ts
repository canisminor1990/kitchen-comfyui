import type {
  EdgeTypes,
  GalleryItem,
  ImageItem,
  NodeId,
  NodeInProgress,
  NodeItem,
  PersistedGraph,
  PropertyKey,
  QueueItem,
  SDNode,
  Widget,
  WidgetKey,
} from '@/types'
import type { ThemeMode } from 'antd-style'
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow'

export type OnPropChange = (node: NodeId, property: PropertyKey, value: any) => void

export interface AppState {
  /******************************************************
   ******************* initialState **********************
   ******************************************************/

  /**
   * @title 页面
   */
  page: string

  /**
   * @title 计数器
   */
  counter: number

  /**
   * @title 小部件
   */
  widgets: Record<WidgetKey, Widget>

  /**
   * @title 图表
   */
  graph: Record<NodeId, SDNode>

  /**
   * @title 节点
   */
  nodes: Node[]

  /**
   * @title 边
   */
  edges: Edge[]

  /**
   * @title 队列
   */
  queue: QueueItem[]

  /**
   * @title 画廊
   */
  gallery: GalleryItem[]

  /**
   * @title 主题模式
   * @enum ['light', 'dark']
   * @enumNames ['亮色', '暗色']
   */
  themeMode: ThemeMode

  /**
   * @title 边类型
   * @enum ['step', 'smoothstep', 'straight', 'flowchart', 'bezier']
   * @enumNames ['步进', '平滑步进', '直线', '流程图', '贝塞尔']
   */
  edgeType: EdgeTypes

  /**
   * @title 节点正在进行
   */
  nodeInProgress?: NodeInProgress

  /**
   * @title 提示错误
   * @ignore
   */
  promptError?: string

  /**
   * @title 客户端 ID
   * @ignore
   */
  clientId?: string

  /******************************************************
   *********************** Base *************************
   ******************************************************/

  /**
   * @title 设置页面
   * @param value - 页面值
   */
  onSetPage: (value: string) => void

  /**
   * @title 设置主题模式
   * @param type - 主题模式类型
   */
  onSetThemeMode: (type: ThemeMode) => void

  /**
   * @title 刷新
   */
  onRefresh: () => Promise<void>

  /**
   * @title 初始化
   */
  onInit: () => Promise<void>

  /**
   * @title 获取新的客户端 ID
   * @param id - 客户端 ID
   */
  onNewClientId: (id: string) => void

  /******************************************************
   *********************** Node *************************
   ******************************************************/

  /**
   * @title 创建组
   */
  onCreateGroup: () => void

  /**
   * @title 设置节点组
   * @param childIds - 子节点 ID 数组
   * @param groupNode - 组节点
   */
  onSetNodesGroup: (childIds: NodeId[], groupNode: Node) => void

  /**
   * @title 分离节点组
   * @param childIds - 子节点 ID 数组
   * @param groupNode - 组节点
   */
  onDetachNodesGroup: (childIds: NodeId[], groupNode: Node) => void

  /**
   * @title 分离组
   * @param node - 节点
   * @returns 节点
   */
  onDetachGroup: (node: Node) => Node

  /**
   * @title 节点变化
   * @param nodes - 节点数组
   */
  onNodesChange: OnNodesChange

  /**
   * @title 更新节点
   * @param id - 节点 ID
   * @param data - 节点数据
   */
  onUpdateNodes: (id: string, data: any) => void

  /**
   * @title 添加节点
   * @param nodeItem - 节点项
   */
  onAddNode: (nodeItem: NodeItem) => void

  /**
   * @title 删除节点
   * @param id - 节点 ID
   */
  onDeleteNode: (id: NodeId) => void

  /**
   * @title 复制节点
   * @param id - 节点 ID
   */
  onDuplicateNode: (id: NodeId) => void

  /**
   * @title 节点进行中
   * @param id - 节点 ID
   * @param progress - 进度
   */
  onNodeInProgress: (id: NodeId, progress: number) => void

  /**
   * @title 属性变化
   * @param node - 节点 ID
   * @param property - 属性
   * @param value - 值
   */
  onPropChange: OnPropChange

  /**
   * @title 修改变化
   * @param node - 节点 ID
   * @param property - 属性
   * @param value - 值
   */
  onModifyChange: OnPropChange

  /**
   * @title 获取节点字段数据
   * @param id - 节点 ID
   * @param key - 字段名
   * @returns 字段数据
   */
  onGetNodeFieldsData: (id: NodeId, key: string) => any

  /**
   * @title 复制节点
   * @returns 持久化图表
   */
  onCopyNode: () => PersistedGraph

  /**
   * @title 粘贴节点
   * @param workflow - 工作流
   * @param postion - 位置
   */
  onPasteNode: (workflow: PersistedGraph, postion: { x: number; y: number }) => void

  /******************************************************
   *********************** Edges *************************
   ******************************************************/

  /**
   * @title 边变化
   * @param edges - 边数组
   */
  onEdgesChange: OnEdgesChange

  /**
   * @title 边动画
   * @param animated - 是否动画
   */
  onEdgesAnimate: (animated: boolean) => void

  /**
   * @title 边类型
   * @param type - 边类型
   */
  onEdgesType: (type: EdgeTypes) => void

  /******************************************************
   ********************* Connection ***********************
   ******************************************************/

  /**
   * @title 连接
   */
  onConnect: OnConnect

  /******************************************************
   *********************** Image *************************
   ******************************************************/

  /**
   * @title 保存图片
   * @param id - 节点 ID
   * @param images - 图片数组
   */
  onImageSave: (id: NodeId, images: ImageItem[]) => void

  /******************************************************
   *********************** Queue *************************
   ******************************************************/

  /**
   * @title 提交
   */
  onSubmit: () => Promise<void>

  /**
   * @title 从队列中删除
   * @param id - 节点 ID
   */
  onDeleteFromQueue: (id: number) => Promise<void>

  /**
   * @title 更新队列
   */
  onQueueUpdate: () => Promise<void>

  /******************************************************
   ***************** Workflow && Persist *******************
   ******************************************************/

  /**
   * @title 持久化临时
   */
  onPersistTemp: () => void

  /**
   * @title 保存本地工作流
   * @param title - 标题
   */
  onSaveLocalWorkFlow: (title?: string) => void

  /**
   * @title 加载本地工作流
   * @param id - 工作流 ID
   */
  onLoadLocalWorkflow: (id: string) => void

  /**
   * @title 更新本地工作流图表
   * @param id - 工作流 ID
   */
  onUpdateLocalWorkFlowGraph: (id: string) => void

  /**
   * @title 更新本地工作流标题
   * @param id - 工作流 ID
   * @param title - 标题
   */
  onUpdateLocalWorkFlowTitle: (id: string, title: string) => void

  /**
   * @title 加载工作流
   * @param persisted - 持久化数据
   */
  onLoadWorkflow: (persisted: PersistedGraph) => void

  /**
   * @title 下载工作流
   */
  onDownloadWorkflow: () => void
}

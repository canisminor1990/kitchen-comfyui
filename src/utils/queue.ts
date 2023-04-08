import { getQueue } from '@/client'
import { QueueItem } from '@/types'

/**
 * 判断节点是否是 CLIPTextEncode 类型的函数
 * @param node - 待判断的节点
 * @returns 返回一个布尔值，表示该节点是否是 CLIPTextEncode 类型
 */
const isCLIPTextEncodeNode = (node: any): boolean =>
  node.class_type === 'CLIPTextEncode' && node.inputs.text !== undefined

/**
 * 获取节点的 prompts 的函数
 * @param node - 待获取 prompts 的节点
 * @returns 返回一个字符串数组，表示该节点的 prompts
 */
const getNodePrompts = (node: any): string[] => (isCLIPTextEncodeNode(node) ? [node.inputs.text] : [])

/**
 * 判断队列项是否属于指定的客户端的函数
 * @param item - 待判断的队列项
 * @param clientId - 待判断的客户端 ID
 * @returns 返回一个布尔值，表示该队列项是否属于指定的客户端
 */
const isQueueItemBelongsToClient = (item: any, clientId: string | undefined): boolean => item[3].client_id === clientId

/**
 * 获取队列项的函数
 * @param clientId - 可选，待获取队列项的客户端 ID
 * @returns 返回一个 Promise，resolve 后返回一个 QueueItem 数组，表示获取到的队列项
 */
export const getQueueItems = async (clientId?: string): Promise<QueueItem[]> => {
  // 获取历史记录
  const history = await getQueue()

  // 从历史记录中获取队列项
  return history.queue_running
    .concat(history.queue_pending)
    .filter((item) => isQueueItemBelongsToClient(item, clientId))
    .map((item) => {
      const id = item[1]
      const graph = item[2]
      const nodes = Object.values(graph)
      const prompts = nodes.flatMap(getNodePrompts)
      const checkpoint = nodes.find((node) => node.class_type.startsWith('CheckpointLoader'))
      const model = checkpoint?.inputs?.ckpt_name

      return { id, prompts, model }
    })
}

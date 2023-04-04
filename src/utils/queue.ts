import { getQueue } from '@/client'
import { QueueItem } from '@/types'

// 用于获取队列项的函数
export async function getQueueItems(clientId?: string): Promise<QueueItem[]> {
  const history = await getQueue()

  // 从历史记录中获取队列项
  const queue = history.queue_running
    .concat(history.queue_pending)
    .filter((item) => {
      const client = item[3]
      return client.client_id === clientId
    })
    .map((item) => {
      const id = item[1]
      const graph = item[2]

      // 获取 prompts 和 model
      const prompts = Object.values(graph).flatMap((node) =>
        node.class_type === 'CLIPTextEncode' && node.inputs.text !== undefined ? [node.inputs.text] : []
      )
      const checkpoint = Object.values(graph).find((node) => node.class_type.startsWith('CheckpointLoader'))
      const model = checkpoint?.inputs?.ckpt_name

      return { id, prompts, model }
    })

  return queue
}

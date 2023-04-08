/**
 * 队列项对象
 * @property id - 队列项 ID
 * @property prompts - 提示信息列表
 * @property model - 模型名称
 */
export interface QueueItem {
  id: number
  prompts: string[]
  model?: string
}

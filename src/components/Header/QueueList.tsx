import { type QueueItem } from '@/types'
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Spin } from 'antd'
import Label from './Label'

interface QueueListProps {
  /**
   * @title 队列
   * @description QueueList 的数据源
   */
  queue: QueueItem[]
  /**
   * @title 从队列中删除
   * @description 当某个元素被删除时触发
   * @param id - 被删除元素的 id
   */
  onDeleteFromQueue: (id: number) => Promise<void>
}

const QueueList = ({ queue, onDeleteFromQueue }: QueueListProps): MenuProps['items'] => {
  if (queue.length === 0)
    return [
      {
        label: 'Empty queue',
        key: 0,
      },
    ]
  return queue.map((it, i) => ({
    icon: i === 0 ? <Spin size="small" indicator={<LoadingOutlined spin />} /> : <DeleteOutlined />,
    onClick: () => void onDeleteFromQueue(it.id),
    label: (
      <div style={{ marginLeft: 8 }}>
        <h5>Queue {it.id}</h5>
        <Label label="model" value={it.model === undefined ? 'N/A' : it.model} />
        {it.prompts.map((prompt, i) => (
          <Label key={i} label="prompt" value={prompt} />
        ))}
      </div>
    ),
    key: it.id,
  }))
}

export default QueueList

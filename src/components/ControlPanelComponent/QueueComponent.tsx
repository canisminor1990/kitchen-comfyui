import { ActionIcon } from '@/components'
import { type QueueItem } from '@/types'
import { DeleteOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Label from './Label'

const CardList = styled.div`
  display: flex;
  flex-direction: column;
`

interface QueueComponentProps {
  queue: QueueItem[]
  onDeleteFromQueue: (id: number) => Promise<void>
}

const QueueComponent: React.FC<QueueComponentProps> = ({ queue, onDeleteFromQueue }) => {
  return queue.length === 0 ? null : (
    <CardList>
      {queue.map((it, i) => (
        <Card
          title={`Queue ${i + 1}`}
          key={i}
          extra={
            <ActionIcon
              icon={<DeleteOutlined />}
              onClick={() => {
                void onDeleteFromQueue(it.id)
              }}
            />
          }
        >
          <Label label="model" value={it.model === undefined ? 'N/A' : it.model} />
          {it.prompts.map((prompt, i) => (
            <Label key={i} label="prompt" value={prompt} />
          ))}
        </Card>
      ))}
    </CardList>
  )
}

export default React.memo(QueueComponent)

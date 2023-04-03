import { type QueueItem } from '@/types'
import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'

interface QueueComponentProps {
  queue: QueueItem[]
  onDeleteFromQueue: (id: number) => Promise<void>
}

const QueueComponent: React.FC<QueueComponentProps> = ({ queue, onDeleteFromQueue }) => {
  return queue.length === 0 ? (
    <div className="m-auto w-full text-center text-stone-500">Nothing to do!</div>
  ) : (
    <div className="overflow-y-scroll w-full">
      {queue.map((it, i) => (
        <div className="p-1 flex bg-stone-800 odd:bg-stone-900 items-center" key={i}>
          {i + 1}.
          <div className="flex flex-wrap">
            <Label label="model" value={it.model === undefined ? 'N/A' : it.model} />
            {it.prompts.map((prompt, i) => (
              <Label key={i} label="prompt" value={prompt} />
            ))}
          </div>
          {i !== 0 ? (
            <TrashIcon
              className="inline h-5 w-5 mx-1 text-red-500 align-text-bottom cursor-pointer"
              onClick={() => {
                void onDeleteFromQueue(it.id)
              }}
            />
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  )
}

interface LabelProps {
  label: string
  value: string
}

const Label: React.FC<LabelProps> = ({ label, value }) => {
  return (
    <div className="p-1 m-1 bg-stone-700 rounded-md text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-lg">
      {label}: {value}
    </div>
  )
}

export default React.memo(QueueComponent)

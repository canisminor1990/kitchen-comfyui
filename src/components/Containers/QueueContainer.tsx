import { QueueComponent } from '@/components'
import { useAppStore } from '@/store'
import React from 'react'
import { shallow } from 'zustand/shallow'

const QueueContainer: React.FC = () => {
  const { queue, onDeleteFromQueue } = useAppStore(
    (st) => ({
      queue: st.queue,
      onDeleteFromQueue: st.onDeleteFromQueue,
    }),
    shallow
  )
  return <QueueComponent queue={queue} onDeleteFromQueue={onDeleteFromQueue} />
}

export default React.memo(QueueContainer)

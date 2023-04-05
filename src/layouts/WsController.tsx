import config from '@/config'
import { useAppStore } from '@/store'
import { Message, MessageType } from '@/types'
import React from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { shallow } from 'zustand/shallow'

const WsMessage = {
  isStatus(m: Message<keyof MessageType>): m is Message<'status'> {
    return m.type === 'status'
  },

  isExecuting(m: Message<keyof MessageType>): m is Message<'executing'> {
    return m.type === 'executing'
  },

  isProgress(m: Message<keyof MessageType>): m is Message<'progress'> {
    return m.type === 'progress'
  },

  isExecuted(m: Message<keyof MessageType>): m is Message<'executed'> {
    return m.type === 'executed'
  },
}

const WsController: React.FC = () => {
  const { clientId, nodeIdInProgress, onNewClientId, onQueueUpdate, onNodeInProgress, onImageSave } = useAppStore(
    (st) => ({
      clientId: st.clientId,
      nodeIdInProgress: st.nodeInProgress?.id,
      onNewClientId: st.onNewClientId,
      onQueueUpdate: st.onQueueUpdate,
      onNodeInProgress: st.onNodeInProgress,
      onImageSave: st.onImageSave,
    }),
    shallow
  )

  useWebSocket(`ws://${config.host}/ws`, {
    onMessage: (ev) => {
      const msg = JSON.parse(ev.data)
      if (process.env.NODE_ENV === 'development') console.log('[webpack]', msg)
      if (WsMessage.isStatus(msg)) {
        if (msg.data.sid !== undefined && msg.data.sid !== clientId) {
          onNewClientId(msg.data.sid)
        }
        void onQueueUpdate()
      } else if (WsMessage.isExecuting(msg)) {
        if (msg.data.node !== undefined) {
          onNodeInProgress(msg.data.node, 0)
        } else if (nodeIdInProgress !== undefined) {
          onNodeInProgress(nodeIdInProgress, 0)
        }
      } else if (WsMessage.isProgress(msg)) {
        if (nodeIdInProgress !== undefined) {
          onNodeInProgress(nodeIdInProgress, msg.data.value / msg.data.max)
        }
      } else if (WsMessage.isExecuted(msg)) {
        const images = msg.data.output.images
        if (Array.isArray(images)) {
          onImageSave(msg.data.node, images)
        }
      }
    },
  })
  return <></>
}

export default WsController

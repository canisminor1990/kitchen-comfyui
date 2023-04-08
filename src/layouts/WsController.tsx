import config from '@/config'
import { useAppStore } from '@/store'
import { MessageType } from '@/types'
import React, { useCallback } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { shallow } from 'zustand/shallow'

const WS_HOST = `ws://${config.host}/ws`

/**
 * WebSocket 控制器
 */
const WsController: React.FC = () => {
  /**
   * 应用程序存储
   */
  const { clientId, nodeIdInProgress, onNewClientId, onQueueUpdate, onNodeInProgress, onImageSave } = useAppStore(
    (st) => ({
      ...st,
      nodeIdInProgress: st.nodeInProgress?.id,
    }),
    shallow
  )

  /**
   * 处理 WebSocket 消息
   * @param ev - WebSocket 消息事件
   */
  const handleWebSocketMessage = useCallback(
    (ev: MessageEvent) => {
      const msg = JSON.parse(ev.data)
      if (process.env.NODE_ENV === 'development') console.log('[webpack]', msg)

      /**
       * 处理不同类型的消息
       */
      const messageHandlers = {
        /**
         * 状态消息
         */
        status: () => {
          if (msg.data.sid !== undefined && msg.data.sid !== clientId) {
            onNewClientId(msg.data.sid)
          }
          void onQueueUpdate()
        },
        /**
         * 执行中消息
         */
        executing: () => {
          if (msg.data.node !== undefined) {
            onNodeInProgress(msg.data.node, 0)
          } else if (nodeIdInProgress !== undefined) {
            onNodeInProgress(nodeIdInProgress, 0)
          }
        },
        /**
         * 进度消息
         */
        progress: () => {
          if (nodeIdInProgress !== undefined) {
            onNodeInProgress(nodeIdInProgress, msg.data.value / msg.data.max)
          }
        },
        /**
         * 执行完成消息
         */
        executed: () => {
          const images = msg.data.output.images
          if (Array.isArray(images)) {
            onImageSave(msg.data.node, images)
          }
        },
      }

      const messageType = msg.type as keyof MessageType
      const messageHandler = messageHandlers[messageType]
      if (messageHandler) messageHandler()
    },
    [clientId, nodeIdInProgress, onNewClientId, onQueueUpdate, onNodeInProgress, onImageSave]
  )

  // 使用 WebSocket hook 连接 WebSocket 服务器
  useWebSocket(WS_HOST, {
    onMessage: handleWebSocketMessage,
  })

  return null
}

export default React.memo(WsController)

import { useAppStore } from '@/store'
import { GithubOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space, Spin, message } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import Logo from './Logo'
import QueueList from './QueueList'
import { EdgeTypeList, ThemeList, View, edgeTypeIcon, themeIcon } from './style'

interface HeaderProps {
  children?: ReactNode
}
const Header: React.FC<HeaderProps> = ({ children }) => {
  const [messageApi, messageHolder] = message.useMessage()
  const [count, setCount] = useState(0)

  const {
    themeMode,
    onSetThemeMode,
    onSubmit,
    queue,
    onDeleteFromQueue,
    promptError,
    onEdgesAnimate,
    edgeType,
    onEdgesType,
  } = useAppStore(
    (st) => ({
      themeMode: st.themeMode,
      onSetThemeMode: st.onSetThemeMode,
      onSubmit: st.onSubmit,
      queue: st.queue,
      onDeleteFromQueue: st.onDeleteFromQueue,
      promptError: st.promptError,
      onEdgesAnimate: st.onEdgesAnimate,
      edgeType: st.edgeType,
      onEdgesType: st.onEdgesType,
    }),
    shallow
  )

  useEffect(() => {
    if (promptError !== undefined)
      messageApi.open({
        type: 'error',
        content: promptError,
        duration: 4,
      })
  }, [promptError, count])

  useEffect(() => {
    onEdgesAnimate(queue.length > 0)
  }, [queue])

  const handleRun = () => {
    onSubmit()
    setCount(count + 1)
  }

  return (
    <>
      <View>
        <Logo themeMode={themeMode} />
        <Space>
          {children}
          <a href="https://github.com/canisminor1990/kitchen-comfyui" target="_blank" rel="noreferrer">
            <Button icon={<GithubOutlined />} />
          </a>
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            menu={{
              items: EdgeTypeList({ onEdgesType }),
            }}
          >
            <Button icon={edgeTypeIcon[edgeType]} />
          </Dropdown>
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            menu={{
              items: ThemeList({ onSetThemeMode }),
            }}
          >
            <Button icon={themeIcon[themeMode]} />
          </Dropdown>
          <Dropdown.Button
            type="primary"
            trigger={['hover']}
            placement="bottomRight"
            onClick={handleRun}
            menu={{ items: QueueList({ queue, onDeleteFromQueue }) }}
            icon={
              queue.length > 0 ? (
                <Spin size="small" indicator={<LoadingOutlined spin style={{ color: '#fff' }} />} />
              ) : undefined
            }
          >
            Run Queue
          </Dropdown.Button>
        </Space>
      </View>
      {messageHolder}
    </>
  )
}

export default React.memo(Header)

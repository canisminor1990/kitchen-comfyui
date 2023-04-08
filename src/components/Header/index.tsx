import { Segmented } from '@/components'
import { useAppStore } from '@/store'
import { GithubOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space, Spin, message } from 'antd'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import Logo from './Logo'
import QueueList from './QueueList'
import { EdgeTypeList, ThemeList, View, edgeTypeIcon, themeIcon } from './style'

const pages = [
  {
    label: 'Flow Editor',
    value: 'flow',
  },
  {
    label: 'Data View',
    value: 'data',
  },
]

/******************************************************
 ************************* Dom *************************
 ******************************************************/

interface HeaderProps {
  children?: ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const [messageApi, messageHolder] = message.useMessage()
  const [count, setCount] = useState(0)

  const {
    page,
    onSetPage,
    themeMode,
    onSetThemeMode,
    onSubmit,
    queue,
    onDeleteFromQueue,
    promptError,
    onEdgesAnimate,
    edgeType,
    onEdgesType,
  } = useAppStore((state) => state, shallow)

  useEffect(() => {
    if (promptError !== undefined) {
      messageApi.open({
        type: 'error',
        content: promptError,
        duration: 4,
      })
    }
  }, [promptError, count, messageApi])

  useEffect(() => {
    onEdgesAnimate(queue.length > 0)
  }, [queue, onEdgesAnimate])

  const handleRun = useCallback(() => {
    onSubmit()
    setCount((prevCount) => prevCount + 1)
  }, [onSubmit])

  const queueHasItems = queue.length > 0

  return (
    <>
      <View>
        <Logo />
        <Segmented options={pages} value={page} onChange={onSetPage} />
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
              queueHasItems ? (
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

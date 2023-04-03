import { ConfigProvider, ControlPanelContainer, DraggablePanel, Header } from '@/components'
import { Layout, Segmented } from 'antd'
import { type ThemeMode } from 'antd-style'
import 'antd/dist/reset.css'
import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'umi'
import GlobalStyle from './GlobalStyle'
import WsController from './WsController'
import { useStore } from './useStore'

const options = [
  { label: '自动', value: 'auto' },
  { label: '亮色', value: 'light' },
  { label: '暗色', value: 'dark' },
]

const EditorView = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`

const Editor: React.FC = () => {
  const themeMode = useStore()

  return (
    <ConfigProvider>
      <EditorView>
        <Layout>
          <Header>
            <Segmented value={themeMode} onChange={(v) => useStore.setState(v as ThemeMode)} options={options} />
          </Header>
          <Outlet />
        </Layout>
        <DraggablePanel>
          <ControlPanelContainer />
        </DraggablePanel>
      </EditorView>
      <GlobalStyle />
      <WsController />
    </ConfigProvider>
  )
}

export default Editor

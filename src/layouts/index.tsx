import { ConfigProvider, ControlPanelContainer, DraggablePanel, Header } from '@/components'
import { useAppStore } from '@/store'
import { Layout, Segmented } from 'antd'
import { type ThemeMode } from 'antd-style'
import 'antd/dist/reset.css'
import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'umi'
import { shallow } from 'zustand/shallow'
import GlobalStyle from './GlobalStyle'
import WsController from './WsController'

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
  const { themeMode, onSetThemeMode } = useAppStore(
    (st) => ({
      themeMode: st.themeMode,
      onSetThemeMode: st.onSetThemeMode,
    }),
    shallow
  )

  return (
    <ConfigProvider>
      <EditorView>
        <Layout>
          <Header>
            <Segmented value={themeMode} onChange={(v) => onSetThemeMode(v as ThemeMode)} options={options} />
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

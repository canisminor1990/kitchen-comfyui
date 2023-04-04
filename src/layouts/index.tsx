import { ConfigProvider, ControlPanelComponent, DraggablePanel, Header } from '@/components'
import { Layout, notification } from 'antd'
import 'antd/dist/reset.css'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Outlet } from 'umi'
import GlobalStyle from './GlobalStyle'
import WsController from './WsController'

const EditorView = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`

const Editor: React.FC = () => {
  useEffect(() => {
    notification.config({
      getContainer: () => document.getElementById('floweditor'),
    })
  }, [])
  return (
    <ConfigProvider>
      <EditorView>
        <Layout>
          <Header />
          <Outlet />
        </Layout>
        <DraggablePanel>
          <ControlPanelComponent />
        </DraggablePanel>
      </EditorView>
      <GlobalStyle />
      <WsController />
    </ConfigProvider>
  )
}

export default Editor

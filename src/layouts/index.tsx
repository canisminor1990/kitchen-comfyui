import { ConfigProvider, ControlPanelComponent, DraggablePanel, Header } from '@/components'
import { Layout } from 'antd'
import 'antd/dist/reset.css'
import React from 'react'
import styled from 'styled-components'
import { Outlet } from 'umi'
import GlobalStyle from './GlobalStyle'
import WsController from './WsController'

/******************************************************
 *********************** Style *************************
 ******************************************************/

const EditorView = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`
/******************************************************
 ************************* Dom *************************
 ******************************************************/
const Editor: React.FC = () => {
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

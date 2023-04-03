import { ControlPanelContainer, FlowContainer } from '@/components'
import { Layout } from 'antd'
import React from 'react'
import WsController from './WsController'

const { Sider, Content } = Layout

const App: React.FC = () => {
  return (
    <Layout>
      <Content>
        <FlowContainer />
      </Content>
      <WsController />
      <Sider style={{ background: 'transparent' }}>
        <ControlPanelContainer />
      </Sider>
    </Layout>
  )
}

export default App

import React from 'react'
import FlowContainer from './FlowContainer'
import WsController from './WsController'

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FlowContainer />
      <WsController />
    </div>
  )
}

export default App

import { GalleryContainer, NodePickerContainer, QueueContainer, Tabs, WorkflowPageContainer } from '@/components'
import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Footer = styled.div`
  flex: none;
  padding: 12px 0;
`

interface ControlPanelComponentProps {
  promptError?: string
  onSubmit: () => Promise<void>
}

const ControlPanelComponent: React.FC<ControlPanelComponentProps> = ({ onSubmit, promptError }) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (promptError !== undefined)
      messageApi.open({
        type: 'error',
        content: promptError,
        duration: 4,
      })
  }, [promptError, count])

  return (
    <>
      {contextHolder}
      <SideBar>
        <Tabs
          defaultActiveKey="Workflow"
          items={[
            {
              label: 'Workflow',
              key: 'Workflow',
              children: (
                <>
                  <div style={{ flex: 1 }}>
                    <WorkflowPageContainer />
                  </div>
                  <Footer>
                    <QueueContainer />
                    <Button
                      style={{ marginTop: 12 }}
                      type="primary"
                      size="large"
                      block
                      onClick={() => {
                        void onSubmit()
                        setCount(count + 1)
                      }}
                    >
                      Enqueue Pipeline
                    </Button>
                  </Footer>
                </>
              ),
            },
            {
              label: 'Nodes',
              key: 'Nodes',
              children: <NodePickerContainer />,
            },
            {
              label: 'Gallery',
              key: 'Gallery',
              children: <GalleryContainer />,
            },
          ]}
        />
      </SideBar>
    </>
  )
}

export default React.memo(ControlPanelComponent)

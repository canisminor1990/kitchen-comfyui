import { GalleryContainer, NodePickerContainer, Tabs, WorkflowPageContainer } from '@/components'
import React from 'react'
import styled from 'styled-components'

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ControlPanelComponent: React.FC = () => {
  return (
    <SideBar>
      <Tabs
        defaultActiveKey="Nodes"
        items={[
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
          {
            label: 'Workflow',
            key: 'Workflow',
            children: <WorkflowPageContainer />,
          },
        ]}
      />
    </SideBar>
  )
}

export default React.memo(ControlPanelComponent)

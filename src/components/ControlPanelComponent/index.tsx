import { GalleryComponent, NodePickerComponent, Tabs, WorkflowPageComponent } from '@/components'
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
            children: <NodePickerComponent />,
          },
          {
            label: 'Workflow',
            key: 'Workflow',
            children: <WorkflowPageComponent />,
          },
          {
            label: 'Gallery',
            key: 'Gallery',
            children: <GalleryComponent />,
          },
        ]}
      />
    </SideBar>
  )
}

export default React.memo(ControlPanelComponent)

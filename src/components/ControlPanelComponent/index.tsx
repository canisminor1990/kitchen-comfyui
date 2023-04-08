import { GalleryComponent, NodePickerComponent, Tabs, WorkflowPageComponent } from '@/components'
import React, { useMemo } from 'react'
import styled from 'styled-components'

enum TABS {
  NODES = 'Nodes',
  WORKFLOW = 'Workflow',
  GALLERY = 'Gallery',
}

/******************************************************
 *********************** Style *************************
 ******************************************************/

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

/******************************************************
 ************************* Dom *************************
 ******************************************************/
const ControlPanelComponent: React.FC = () => {
  const tabs = useMemo(
    () => [
      {
        label: TABS.NODES,
        key: TABS.NODES,
        children: <NodePickerComponent />,
      },
      {
        label: TABS.WORKFLOW,
        key: TABS.WORKFLOW,
        children: <WorkflowPageComponent />,
      },
      {
        label: TABS.GALLERY,
        key: TABS.GALLERY,
        children: <GalleryComponent />,
      },
    ],
    []
  )

  return (
    <SideBar>
      <Tabs defaultActiveKey={TABS.NODES} items={tabs} />
    </SideBar>
  )
}

export default React.memo(ControlPanelComponent)

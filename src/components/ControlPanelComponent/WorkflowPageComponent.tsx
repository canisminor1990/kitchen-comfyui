import { readWorkflowFromFile } from '@/persistence'
import { useAppStore } from '@/store'
import { Button, Input } from 'antd'
import React from 'react'
import { shallow } from 'zustand/shallow'

const WorkflowPageComponent = () => {
  const { onLoadWorkflow, onSaveWorkflow } = useAppStore(
    (st) => ({
      onLoadWorkflow: st.onLoadWorkflow,
      onSaveWorkflow: st.onSaveWorkflow,
    }),
    shallow
  )

  return (
    <div>
      <h5>Load workflow</h5>
      <Input type="file" className="hidden" onChange={(ev) => readWorkflowFromFile(ev, onLoadWorkflow)} />
      <div style={{ height: 12 }} />
      <h5>Save workflow</h5>
      <Button block onClick={onSaveWorkflow}>
        Save Workflow
      </Button>
    </div>
  )
}

export default React.memo(WorkflowPageComponent)

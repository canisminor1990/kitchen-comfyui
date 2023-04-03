import { readWorkflowFromFile, type PersistedGraph } from '@/persistence'
import { Button, Input } from 'antd'
import React from 'react'

interface WorkflowPageComponentProps {
  onLoadWorkflow: (persisted: PersistedGraph) => void
  onSaveWorkflow: () => void
}

const WorkflowPageComponent: React.FC<WorkflowPageComponentProps> = ({ onLoadWorkflow, onSaveWorkflow }) => {
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

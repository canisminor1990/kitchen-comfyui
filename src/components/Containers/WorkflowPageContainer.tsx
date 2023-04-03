import { WorkflowPageComponent } from '@/components'
import { useAppStore } from '@/store'
import React from 'react'

const WorkflowPageContainer: React.FC = () => {
  const { onLoadWorkflow, onSaveWorkflow } = useAppStore((st) => ({
    onLoadWorkflow: st.onLoadWorkflow,
    onSaveWorkflow: st.onSaveWorkflow,
  }))
  return <WorkflowPageComponent onLoadWorkflow={onLoadWorkflow} onSaveWorkflow={onSaveWorkflow} />
}

export default React.memo(WorkflowPageContainer)

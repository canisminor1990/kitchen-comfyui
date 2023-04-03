import { readWorkflowFromFile, type PersistedGraph } from '@/persistence'
import React from 'react'

interface WorkflowPageComponentProps {
  onLoadWorkflow: (persisted: PersistedGraph) => void
  onSaveWorkflow: () => void
}

const WorkflowPageComponent: React.FC<WorkflowPageComponentProps> = ({ onLoadWorkflow, onSaveWorkflow }) => {
  return (
    <div className="px-2 py-4">
      <label className="p-2 cursor-pointer bg-stone-800 hover:bg-stone-700 rounded-md cursor-pointer">
        Load workflow
        <input type="file" className="hidden" onChange={(ev) => readWorkflowFromFile(ev, onLoadWorkflow)}></input>
      </label>
      <div
        className="p-2 my-4 cursor-pointer bg-stone-800 hover:bg-stone-700 rounded-md cursor-pointer"
        onClick={onSaveWorkflow}
      >
        Save workflow
      </div>
    </div>
  )
}

export default React.memo(WorkflowPageComponent)

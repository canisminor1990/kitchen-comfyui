import { GalleryContainer, NodePickerContainer, QueueContainer, WorkflowPageContainer } from '@/components'
import { ExitFullScreenIcon } from '@radix-ui/react-icons'
import { Button } from 'antd'
import React, { useState } from 'react'

type Tab = 'Queue' | 'Gallery' | 'Nodes' | 'Workflow'

interface PanelState {
  activeTab: Tab
  minimized: boolean
}

interface ControlPanelComponentProps {
  promptError?: string
  onSubmit: () => Promise<void>
}

const TABS: Tab[] = ['Queue', 'Gallery', 'Nodes', 'Workflow']

const ControlPanelComponent: React.FC<ControlPanelComponentProps> = ({ onSubmit, promptError }) => {
  const [{ activeTab, minimized }, setState] = useState<PanelState>({
    activeTab: 'Queue',
    minimized: false,
  })

  return (
    <>
      {promptError !== undefined ? (
        <div className="error-popup p-1 text-sm rounded-md bg-stone-900 border-2 border-stone-400 text-red-500">
          {promptError}
        </div>
      ) : (
        <></>
      )}
      <div className="drop-shadow-lg rounded-md bg-stone-900 border-2 border-stone-400 flex flex-col overflow-hidden">
        <PanelTabs tabs={TABS} active={activeTab} onTabChange={(tab) => setState({ minimized: false, activeTab: tab })}>
          <Button
            type="primary"
            onClick={() => {
              void onSubmit()
            }}
          >
            Enqueue
          </Button>
          <ExitFullScreenIcon
            className="h-5 w-5 mx-1 text-blue-500 self-center cursor-pointer"
            onClick={() => setState((st) => ({ ...st, minimized: !st.minimized }))}
          />
        </PanelTabs>
        {minimized ? (
          <></>
        ) : (
          <div className="h-80 flex">
            {minimized ? (
              <></>
            ) : activeTab === 'Queue' ? (
              <QueueContainer />
            ) : activeTab === 'Gallery' ? (
              <GalleryContainer />
            ) : activeTab === 'Nodes' ? (
              <NodePickerContainer />
            ) : (
              <WorkflowPageContainer />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default React.memo(ControlPanelComponent)

interface PanelTabsProps<T> {
  tabs: T[]
  active: T
  onTabChange: (tab: T) => void
  children: JSX.Element[]
}

const PanelTabs: React.FC<PanelTabsProps<Tab>> = ({ tabs, active, onTabChange, children }) => {
  return (
    <div className="flex flex-row justify-end bg-stone-800 px-2 drop-shadow-md">
      {tabs.map((t) => (
        <PanelTab key={t} label={t} isActive={t === active} onClick={() => onTabChange(t)} />
      ))}
      {children}
    </div>
  )
}

interface PanelTabProps {
  label: string
  isActive: boolean
  onClick: () => void
}

const PanelTab: React.FC<PanelTabProps> = ({ label, isActive, onClick }) => {
  const bgClasses = isActive ? ['bg-stone-600'] : ['bg-stone-800', 'hover:bg-stone-700']
  const defaultClasses = ['p-2', 'mx-0.5', 'cursor-pointer']
  return (
    <div className={defaultClasses.concat(bgClasses).join(' ')} onClick={onClick}>
      {label}
    </div>
  )
}

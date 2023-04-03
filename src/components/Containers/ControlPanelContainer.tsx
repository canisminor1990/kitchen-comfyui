import { ControlPanelComponent } from '@/components'
import { useAppStore } from '@/store'
import React from 'react'
import { shallow } from 'zustand/shallow'

const ControlPanelContainer: React.FC = () => {
  const { promptError, onSubmit } = useAppStore(
    (st) => ({
      promptError: st.promptError,
      onSubmit: st.onSubmit,
    }),
    shallow
  )
  return <ControlPanelComponent promptError={promptError} onSubmit={onSubmit} />
}

export default React.memo(ControlPanelContainer)

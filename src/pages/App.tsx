import { useAppStore } from '@/store'
import React from 'react'
import { shallow } from 'zustand/shallow'
import DataView from './DataView'
import FlowEditor from './FlowEditor'
const App: React.FC = () => {
  const { page } = useAppStore((st) => st, shallow)

  return (
    <>
      {page === 'flow' && <FlowEditor />}
      {page === 'data' && <DataView />}
    </>
  )
}

export default App

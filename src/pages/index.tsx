import { useAppStore } from '@/store'
import { FC } from 'react'
import DataView from './DataView'
import FlowEditor from './FlowEditor'

const App: FC = () => {
  const page = useAppStore((st) => st.page)

  return (
    <>
      {page === 'flow' && <FlowEditor />}
      {page === 'data' && <DataView />}
    </>
  )
}

export default App

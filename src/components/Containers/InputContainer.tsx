import { InputComponent } from '@/components'
import { useAppStore } from '@/store'
import { InputData, NodeId } from '@/types'
import React from 'react'
import { shallow } from 'zustand/shallow'

interface InputContainerProps {
  id: NodeId
  name: string
  input: InputData
}
const InputContainer: React.FC<InputContainerProps> = ({ id, name, input }) => {
  const { value, onPropChange } = useAppStore(
    (st) => ({
      value: st.graph[id]?.fields[name],
      onPropChange: st.onPropChange,
    }),
    shallow
  )
  return <InputComponent value={value} input={input} onChange={(val) => onPropChange(id, name, val)} />
}

export default React.memo(InputContainer)

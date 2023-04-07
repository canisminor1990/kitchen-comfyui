import { Input, TextArea } from '@/components'
import { useAppStore } from '@/store'
import { InputData, NodeId } from '@/types'
import { checkInput } from '@/utils'
import { Checkbox } from 'antd'
import { debounce } from 'lodash-es'
import React from 'react'
import { shallow } from 'zustand/shallow'
import SelectUploadInput from './SelectUploadInput'
import SliderInput from './SliderInput'

interface InputProps {
  id: NodeId
  name: string
  input: InputData
}

const InputComponent: React.FC<InputProps> = ({ id, name, input }) => {
  const { value, onChange } = useAppStore(
    (st) => ({
      value: st.graph[id]?.fields[name],
      onChange: debounce((val: any) => st.onPropChange(id, name, val?.target?.value ? val.target.value : val), 100),
    }),
    shallow
  )
  /******************************************************
   *********************** isList ************************
   ******************************************************/

  if (checkInput.isList(input)) {
    return <SelectUploadInput value={value} name={name} input={input} onChange={onChange} />
  }
  /******************************************************
   ********************** isBool ************************
   ******************************************************/

  if (checkInput.isBool(input)) {
    return <Checkbox value={value} defaultChecked={input[1].default} onChange={onChange} />
  }

  /******************************************************
   *********************** isInt ************************
   ******************************************************/

  if (checkInput.isInt(input)) {
    return (
      <SliderInput
        name={name.toLowerCase()}
        style={{ width: '100%' }}
        value={Number(value !== null ? value : input[1].default)}
        max={Number(input[1].max)}
        min={Number(input[1].min)}
        onChange={(val) => onChange(Number(val?.target?.value ? val.target.value : val))}
      />
    )
  }

  /******************************************************
   ********************* isFloat ***********************
   ******************************************************/

  if (checkInput.isFloat(input)) {
    return (
      <SliderInput
        name={name.toLowerCase()}
        style={{ width: '100%' }}
        step={0.01}
        value={Number(value !== null ? value : input[1].default)}
        max={Number(input[1].max)}
        min={Number(input[1].min)}
        onChange={(val) => onChange(Number(val?.target?.value ? val.target.value : val))}
      />
    )
  }

  /******************************************************
   ********************* isString ***********************
   ******************************************************/

  if (checkInput.isString(input)) {
    const args = input[1]
    if (args.multiline === true) {
      return <TextArea style={{ height: 128, width: '100%' }} defaultValue={value} onBlur={onChange} />
    }
    return <Input style={{ width: '100%' }} value={value} onChange={onChange} />
  }

  return null
}

export default React.memo(InputComponent)

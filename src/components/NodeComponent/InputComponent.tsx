import { Input, Select, TextArea } from '@/components'
import { useAppStore } from '@/store'
import { InputData, NodeId } from '@/types'
import { checkInput } from '@/utils'
import { Checkbox } from 'antd'
import { debounce } from 'lodash-es'
import React from 'react'
import { shallow } from 'zustand/shallow'
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
    const data = input[0]
    let options: any = []
    const newData: any = {}
    const flatDat: any = []
    data.forEach((o) => {
      if (o.includes('\\')) {
        const group = o.split('\\')[0]
        const name = o.split('\\')[1]
        if (!newData[group]) newData[group] = []
        newData[group].push({
          value: o,
          label: name,
        })
      } else {
        flatDat.push({
          value: o,
          label: o,
        })
      }
    })

    if (flatDat) options = flatDat
    if (newData)
      options = [
        ...options,
        ...Object.entries(newData).map(([key, value]) => ({
          label: key,
          options: value,
        })),
      ]

    return (
      <Select
        showSearch
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) =>
          String(option?.label ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        style={{ width: '100%' }}
        size="small"
        value={value}
        defaultValue={input[0][0]}
        onChange={onChange}
        options={options}
      />
    )
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

import { InputData } from '@/types'
import { checkInput } from '@/utils'
import { Checkbox, Input, InputNumber, Select } from 'antd'
import React from 'react'

const MAX_SELECT_NAME = 36

interface InputProps {
  value: any
  input: InputData
  onChange: (val: any) => void
}

const InputComponent: React.FC<InputProps> = ({ value, input, onChange }) => {
  if (checkInput.isList(input)) {
    return (
      <Select
        style={{ width: '100%' }}
        size="small"
        value={value}
        defaultValue={input[0][0]}
        onChange={onChange}
        options={input[0].map((o) => ({
          value: o,
          label: o.length > MAX_SELECT_NAME ? `…${o.substring(o.length - MAX_SELECT_NAME + 1)}` : o,
        }))}
      />
    )
  }
  if (checkInput.isBool(input)) {
    return <Checkbox value={value} defaultChecked={input[1].default} onChange={(e) => onChange(e.target.checked)} />
  }
  if (checkInput.isInt(input)) {
    return (
      <InputNumber
        style={{ width: '100%' }}
        size="small"
        value={value}
        max={input[1].max}
        min={input[1].min}
        defaultValue={input[1].default}
        onChange={onChange}
      />
    )
  }
  if (checkInput.isFloat(input)) {
    return (
      <InputNumber
        style={{ width: '100%' }}
        size="small"
        step="0.01"
        value={value}
        max={input[1].max}
        min={input[1].min}
        defaultValue={input[1].default}
        onChange={onChange}
      />
    )
  }
  if (checkInput.isString(input)) {
    const args = input[1]
    if (args.multiline === true) {
      return (
        <textarea
          style={{ height: 128, width: '100%' }}
          className="px-1 grow nodrag text-xs"
          value={value}
          onChange={(ev) => onChange(ev.target.value)}
        />
      )
    }
    return <Input style={{ width: '100%' }} value={value} onChange={(e) => onChange(e.target.value)} />
  }
  return <></>
}

export default React.memo(InputComponent)

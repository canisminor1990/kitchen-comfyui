import { Input, Select, TextArea } from '@/components'
import { InputData } from '@/types'
import { checkInput } from '@/utils'
import { Checkbox } from 'antd'
import React from 'react'
import { DecimalStep, IntegerStep } from './SliderInput'

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
    return <Checkbox value={value} defaultChecked={input[1].default} onChange={onChange} />
  }
  if (checkInput.isInt(input)) {
    return (
      <IntegerStep
        style={{ width: '100%' }}
        value={Number(value !== null ? value : input[1].default)}
        max={Number(input[1].max)}
        min={Number(input[1].min)}
        onChange={(val) => onChange(Number(val?.target?.value ? val.target.value : val))}
      />
    )
  }
  if (checkInput.isFloat(input)) {
    return (
      <DecimalStep
        style={{ width: '100%' }}
        step={0.01}
        value={Number(value !== null ? value : input[1].default)}
        max={Number(input[1].max)}
        min={Number(input[1].min)}
        onChange={(val) => onChange(Number(val?.target?.value ? val.target.value : val))}
      />
    )
  }
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

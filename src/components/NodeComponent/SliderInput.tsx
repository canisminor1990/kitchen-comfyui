import { InputNumber } from '@/components'
import { Slider } from 'antd'
import React, { CSSProperties, useState } from 'react'
import styled from 'styled-components'

const Row = styled.div`
  display: flex;
`

const Col = styled.div<{ span: number }>`
  flex: ${({ span }) => span};
`

interface IntegerStepProps {
  value: number
  min: number
  max: number
  style?: CSSProperties
  onChange: (val: any) => void
}

export const IntegerStep: React.FC<IntegerStepProps> = ({ value, min, max, style, onChange }) => {
  const [inputValue, setInputValue] = useState<number>(value)

  const handleChange = (newValue: number | any) => {
    const val = Number(newValue?.target?.value ? newValue.target.value : newValue)
    if (val !== null) {
      setInputValue(val)
      onChange(val)
    }
  }

  if (max > 10000)
    return <InputNumber style={style} min={min} max={max} value={value} onBlur={onChange} onPressEnter={onChange} />

  return (
    <Row style={style}>
      <Col span={4} style={{ marginRight: 12 }}>
        <InputNumber
          style={{ width: '100%' }}
          min={min}
          max={max}
          value={inputValue}
          onBlur={handleChange}
          onPressEnter={handleChange}
        />
      </Col>
      <Col span={8}>
        <Slider min={min} max={max} onChange={handleChange} value={typeof inputValue === 'number' ? inputValue : 0} />
      </Col>
    </Row>
  )
}

interface DecimalStepProps {
  value: number
  min: number
  max: number
  step: number
  style?: CSSProperties
  onChange: (val: any) => void
}

export const DecimalStep: React.FC<DecimalStepProps> = ({ value, min, max, step, style, onChange }) => {
  const [inputValue, setInputValue] = useState<number>(value)

  const handleChange = (newValue: number | any) => {
    const val = Number(newValue?.target?.value ? newValue.target.value : newValue)
    if (val !== null) {
      setInputValue(val)
      onChange(val)
    }
  }

  if (max > 10000)
    return (
      <InputNumber
        style={style}
        min={min}
        max={max}
        value={value}
        step={step}
        onBlur={onChange}
        onPressEnter={onChange}
      />
    )

  return (
    <Row style={style}>
      <Col span={4} style={{ marginRight: 12 }}>
        <InputNumber
          style={{ width: '100%' }}
          min={min}
          max={max}
          step={step}
          value={inputValue}
          onBlur={handleChange}
          onPressEnter={handleChange}
        />
      </Col>
      <Col span={8}>
        <Slider
          min={min}
          max={max}
          onChange={handleChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
          step={step}
        />
      </Col>
    </Row>
  )
}

import { InputNumber } from '@/components'
import { useAppStore } from '@/store'
import { Checkbox, Slider } from 'antd'
import React, { CSSProperties, useEffect, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

const Row = styled.div`
  display: flex;
`

const Col = styled.div<{ span: number }>`
  flex: ${({ span }) => span};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > * {
    width: 100%;
  }
`

interface SliderInputProps {
  name: string
  value: number
  min: number
  max: number
  step?: number
  style?: CSSProperties
  onChange: (val: any) => void
}

const SliderInput: React.FC<SliderInputProps> = ({ name, value, min, max, step, style, onChange }) => {
  const { counter } = useAppStore(
    (st) => ({
      counter: st.counter,
    }),
    shallow
  )

  const [inputValue, setInputValue] = useState<number>(value)
  const [checked, setChecked] = useState(true)

  const isSeed = name === 'seed'
  switch (name) {
    case 'steps':
      max = 200
      break
    case 'cfg':
      max = 32
      step = 0.5
      break
    case 'width':
      max = 4096
      min = 512
      step = 4
      break
    case 'height':
      max = 4096
      min = 512
      step = 4
      break
    default:
      break
  }

  const handleChange = (newValue: number | any) => {
    const val = Number(newValue?.target?.value ? newValue.target.value : newValue)
    if (val !== null) {
      setInputValue(val)
      onChange(val)
    }
  }

  useEffect(() => {
    if (!isSeed || !checked) return
    handleChange(Math.floor(Math.random() * max))
  }, [counter])

  return (
    <Row style={style}>
      <Col span={isSeed ? 12 : 4} style={{ marginRight: 12 }}>
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
      <Col span={isSeed ? 4 : 12}>
        {isSeed ? (
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
            Random
          </Checkbox>
        ) : (
          <Slider
            min={min}
            max={max}
            onChange={handleChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
            step={step}
          />
        )}
      </Col>
    </Row>
  )
}

export default React.memo(SliderInput)

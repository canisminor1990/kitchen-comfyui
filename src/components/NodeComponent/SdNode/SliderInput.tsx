import { InputNumber } from '@/components'
import { useAppStore } from '@/store'
import { Checkbox, Slider } from 'antd'
import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

/******************************************************
 *********************** Style *************************
 ******************************************************/

const Row = styled.div`
  display: flex;
`

const Col = styled.div<{ span: number }>`
  display: flex;
  flex: ${({ span }) => span};
  align-items: center;
  justify-content: flex-start;
  > * {
    width: 100%;
  }
`

/******************************************************
 ************************* Dom *************************
 ******************************************************/

/**
 * @title 滑动输入框参数
 */
interface SliderInputProps {
  /**
   * @title 输入框名称
   */
  name: string
  /**
   * @title 当前选中值
   */
  value: number
  /**
   * @title 最小值
   */
  min: number
  /**
   * @title 最大值
   */
  max: number
  /**
   * @title 步长
   */
  step?: number
  /**
   * @title 样式
   */
  style?: CSSProperties
  /**
   * @title 值变化的回调函数
   * @param val - 变化后的值
   */
  onChange: (val: any) => void
}

const SliderInput: React.FC<SliderInputProps> = ({ name, value, min, max, step, style, onChange }) => {
  const { counter } = useAppStore((st) => st, shallow)
  const [inputValue, setInputValue] = useState<number>(value)
  const [isRandom, setIsRandom] = useState<boolean>(false)
  const isSeed = name === 'seed'

  const { iMax, iMin, iStep } = useMemo(() => {
    let iMax = max
    let iMin = min
    let iStep = step
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
    return { iMax, iMin, iStep }
  }, [name, max, min, step])

  const handleChange = useCallback(
    (newValue: number | any) => {
      const val = Number(newValue?.target?.value ? newValue.target.value : newValue)
      if (!isNaN(val)) {
        setInputValue(val)
        onChange(val)
      }
    },
    [onChange]
  )

  const handleCheckboxChange = useCallback((e: any) => {
    setIsRandom(e.target.checked)
  }, [])

  useEffect(() => {
    if (!isSeed || !isRandom) return
    handleChange(Math.floor(Math.random() * iMax))
  }, [counter, iMax])

  return (
    <Row style={style}>
      <Col span={isSeed ? 12 : 4} style={{ marginRight: 12 }}>
        <InputNumber
          style={{ width: '100%' }}
          min={iMin}
          max={iMax}
          step={iStep}
          value={Number(inputValue)}
          onBlur={handleChange}
          onPressEnter={handleChange}
        />
      </Col>
      <Col span={isSeed ? 4 : 12}>
        {isSeed ? (
          <Checkbox checked={isRandom} onChange={handleCheckboxChange}>
            Random
          </Checkbox>
        ) : (
          <Slider min={iMin} max={iMax} onChange={handleChange} value={Number(inputValue)} step={iStep} />
        )}
      </Col>
    </Row>
  )
}

export default React.memo(SliderInput)

import { type Widget } from '@/types'
import { checkInput } from '@/utils'
import { startCase } from 'lodash-es'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { NodeCard, SpaceCol, SpaceGrid } from '../style'

/******************************************************
 *********************** Style *************************
 ******************************************************/

const Slot = styled.div<{ isRequired: 1 | 0 }>`
  background: ${({ isRequired, theme }) => (isRequired ? theme.colorPrimary : theme.colorBorder)};
  margin-top: 6px;
`

/******************************************************
 ************************* Dom *************************
 ******************************************************/

/**
 * @title 预览节点参数
 */
interface PreviewNodeProps {
  /**
   * @title 组件数据
   */
  data: Widget
}

const PreviewNode: React.FC<PreviewNodeProps> = ({ data }) => {
  const outputs = useMemo(() => data.output.map((o) => ({ name: o, type: o })), [data.output])
  const [params, inputs] = useMemo(() => {
    const params: any[] = []
    const inputs: any[] = []

    Object.entries(data.input.required).forEach(([property, input]) => {
      if (checkInput.isParameterOrList(input)) {
        params.push({ name: property, type: input[0], input })
      } else {
        inputs.push({ name: property, type: input[0] })
      }
    })

    return [params, inputs]
  }, [data.input.required])

  const RenderInput = useCallback(
    ({ item, position, isRequired }: { item: any; position: 'left' | 'right'; isRequired: 1 | 0 }) => (
      <h5>
        <Slot className="react-flow__handle" style={{ [position]: -3 }} isRequired={isRequired} />
        {startCase(item.name)}
      </h5>
    ),
    []
  )

  return (
    <NodeCard size="small" title={data.name} active={0} style={{ minWidth: 240 }}>
      <SpaceGrid>
        <SpaceCol>
          {inputs.map((item, index) => (
            <RenderInput key={index} item={item} position="left" isRequired={1} />
          ))}
        </SpaceCol>
        <SpaceCol style={{ textAlign: 'right' }}>
          {outputs.map((item, index) => (
            <RenderInput key={index} item={item} position="right" isRequired={1} />
          ))}
        </SpaceCol>
      </SpaceGrid>
      <SpaceCol>
        {params.map((item, index) => (
          <RenderInput key={index} item={item} position="left" isRequired={0} />
        ))}
      </SpaceCol>
    </NodeCard>
  )
}

export default React.memo(PreviewNode)

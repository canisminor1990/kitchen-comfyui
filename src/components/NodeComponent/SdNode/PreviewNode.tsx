import { type Widget } from '@/types'
import { checkInput } from '@/utils'
import { startCase } from 'lodash-es'
import React from 'react'
import styled from 'styled-components'
import { NodeCard, SpaceCol, SpaceGrid } from '../style'

const Slot = styled.div<{ isRequired: 1 | 0 }>`
  background: ${({ isRequired, theme }) => (isRequired ? theme.colorPrimary : theme.colorBorder)};
  margin-top: 6px;
`

interface PreviewNodeProps {
  data: Widget
}

const PreviewNode: React.FC<PreviewNodeProps> = (node) => {
  const params: any[] = []
  const inputs: any[] = []
  const outputs: any[] = node.data.output
  for (const [property, input] of Object.entries(node?.data?.input?.required)) {
    if (checkInput.isParameterOrList(input)) {
      params.push({ name: property, type: input[0], input })
    } else {
      inputs.push({ name: property, type: input[0] })
    }
  }

  return (
    <NodeCard size="small" title={node.data.name} active={0}>
      <SpaceGrid>
        <SpaceCol>
          {inputs.map((item, index) => (
            <h5 key={index}>
              <Slot className="react-flow__handle" style={{ left: -3 }} isRequired={1} />
              {startCase(item.name)}
            </h5>
          ))}
        </SpaceCol>
        <SpaceCol style={{ textAlign: 'right' }}>
          {outputs.map((item, index) => (
            <h5 key={index}>
              <Slot className="react-flow__handle" style={{ right: -3 }} isRequired={1} />
              {startCase(item)}
            </h5>
          ))}
        </SpaceCol>
      </SpaceGrid>
      <SpaceCol>
        {params.map((item, index) => (
          <h5 key={index}>
            <Slot className="react-flow__handle" style={{ left: -3 }} isRequired={0} />
            {startCase(item.name)}
          </h5>
        ))}
      </SpaceCol>
    </NodeCard>
  )
}

export default React.memo(PreviewNode)

import { Card } from 'antd'
import { Position } from 'reactflow'
import styled, { css } from 'styled-components'

export const NodeCard = styled(Card)<{ active: 1 | 0 }>`
  box-shadow: ${({ theme }) => theme.boxShadowTertiary};
  min-width: 80px;
  min-height: 120px;
  ${({ active, theme }) =>
    active
      ? css`
          outline: 2px solid ${theme.colorPrimary};
        `
      : ''};
  .ant-card-head {
    background: ${({ theme }) => theme.colorFillQuaternary} !important;
    padding-right: 3px;
    border-bottom: unset;
    height: 15px;
  }
`

export const GroupCard = styled(Card)<{ active: 1 | 0 }>`
  min-width: 80px;
  min-height: 120px;
  height: 100%;
  ${({ active, theme }) =>
    active
      ? css`
          outline: 2px solid ${theme.colorPrimary};
        `
      : ''};
  .react-flow__resize-control {
    pointer-events: all !important;
  }
  .ant-card-head {
    background: ${({ theme }) => theme.colorFillQuaternary} !important;
    padding-right: 3px;
    border-bottom: unset;
    height: 15px;
    pointer-events: all !important;
  }
`

export const Slot = styled.div<{ isRequired: 1 | 0; position: Position }>`
  text-align: ${({ position }) => position};
  .react-flow__handle {
    top: unset;
    margin-top: 10px;
    background: ${({ isRequired, theme }) => (isRequired ? theme.colorPrimary : theme.colorBorder)};
  }
`

export const SpaceCol = styled.div`
  flex: 1;
`

export const SpaceGrid = styled.div`
  width: 100%;
  align-items: stretch;
  justify-content: stretch;
  display: flex;

  ${SpaceCol} + ${SpaceCol} {
    margin-left: 24px;
  }
`

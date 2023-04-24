import { Card } from 'antd'
import { Position } from 'reactflow'
import styled, { css } from 'styled-components'

export const NodeCard = styled(Card)<{ active: 1 | 0 }>`
  min-width: 80px;
  min-height: 40px;
  box-shadow: ${({ theme }) => theme.boxShadowTertiary};

  ${({ active, theme }) =>
    active
      ? css`
          outline: 2px solid ${theme.colorPrimary};
        `
      : ''};
  .ant-card-head {
    height: 15px;
    padding-right: 3px;
    background: ${({ theme }) => theme.colorFillQuaternary} !important;
    border-bottom: unset;
  }
`

export const GroupCard = styled(Card)<{ active: 1 | 0 }>`
  min-width: 80px;
  height: 100%;
  min-height: 120px;

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
    pointer-events: all !important;

    height: 15px;
    padding-right: 3px;

    background: ${({ theme }) => theme.colorFillQuaternary} !important;
    border-bottom: unset;
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
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;

  ${SpaceCol} + ${SpaceCol} {
    margin-left: 24px;
  }
`

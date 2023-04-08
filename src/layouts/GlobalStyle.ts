import { createGlobalStyle } from 'antd-style'
import { rgba } from 'polished'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colorTextBase};
    background: ${({ theme }) => theme.colorBgBase};
  }

  div {
    user-select: none;
  }

  code,.react-json-view {
    font-family: 'Hack', 'IBM Plex Mono', 'ui-monospace', 'Consolas', monospace !important;
  }

  .react-flow__node[type="Group"] {
    z-index: -1 !important;
    pointer-events: none !important;
  }

  .ant-card[type="Reroute"] .react-flow__handle {
    margin-top: 0;
  }


  .react-json-view {
    background: transparent !important;
  }

    /* width */
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colorBorderSecondary};
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background:  ${({ theme }) => theme.colorBorder};
  }


  .react-flow__handle {
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }

  .react-flow__handle-connecting {
    background: ${({ theme }) => theme.colorError} !important;
  }

  .react-flow__handle-valid {
    background: ${({ theme }) => theme.colorSuccess} !important;
  }

  .react-flow__minimap-mask {
    fill: ${({ theme }) => theme.colorBgMask};
  }

  .react-flow__minimap {
    background: ${({ theme }) => rgba(theme.colorBgContainer, 0.8)};
    backdrop-filter: blur(24px);
    border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
    overflow: hidden;
    border-radius: 4px;
    height: 150px;
    box-shadow: ${({ theme }) => theme.boxShadowTertiary};
  }

  .react-flow__minimap-node {
    opacity: .5;
  }

  .react-flow__attribution {
    display: none;
  }

  .react-flow__controls {
    border: 1px solid ${({ theme }) => theme.colorBorder};
    box-shadow: ${({ theme }) => theme.boxShadow};

    button + button {
      border-top: 1px solid ${({ theme }) => theme.colorBorder};
    }

    button {
      background-color: ${({ theme }) => theme.colorBgElevated};
      color: ${({ theme }) => theme.colorTextBase};
      border-bottom: none;
      &:hover {
        background-color: ${({ theme }) => theme.colorBgSpotlight};
      }

      path {
        fill: currentColor;
      }
    }
  }
`

export default GlobalStyle

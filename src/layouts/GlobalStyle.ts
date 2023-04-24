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
    pointer-events: none !important;
    z-index: -1 !important;
  }

  .react-flow__handle {
    width: 8px;
    height: 8px;
    border-radius: 4px;
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
    overflow: hidden;

    height: 150px;

    background: ${({ theme }) => rgba(theme.colorBgContainer, 0.8)};
    backdrop-filter: blur(24px);
    border: 1px solid ${({ theme }) => theme.colorBorderSecondary};
    border-radius: 4px;
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

    button {
      color: ${({ theme }) => theme.colorTextBase};
      background-color: ${({ theme }) => theme.colorBgElevated};
      border-bottom: none;
      path {
        fill: currentColor;
      }
    }

    button + button {
      border-top: 1px solid ${({ theme }) => theme.colorBorder};
    }

    button:hover {
      background-color: ${({ theme }) => theme.colorBgSpotlight};
    }
  }
`

export default GlobalStyle

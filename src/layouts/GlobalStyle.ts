import { createGlobalStyle } from 'antd-style'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colorTextBase};
    background: ${({ theme }) => theme.colorBgBase};
  }

  .react-flow__handle {
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }

  .react-flow__minimap-mask {
    fill: ${({ theme }) => theme.colorBgMask};
  }

  .react-flow__minimap-node {
    fill: ${({ theme }) => theme.colorFill};
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

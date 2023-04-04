import { createStudioAntdTheme } from '@/components/theme'
import { useAppStore } from '@/store'
import { AntdToken, ThemeAppearance, ThemeProvider, setupStyled, useAntdToken, useThemeMode } from 'antd-style'
import type { OverrideToken } from 'antd/es/theme/interface'
import type { FC, ReactNode } from 'react'
import { ThemeContext } from 'styled-components'
import { shallow } from 'zustand/shallow'
export const useStudioAntdTheme = (appearance: ThemeAppearance) => {
  const token = useAntdToken()
  const themeConfig = createStudioAntdTheme(appearance)

  const controlToken: Partial<AntdToken> = {
    colorBgContainer: token?.colorFillQuaternary,
    colorBorder: 'transparent',
    controlHeightSM: 24,
    controlOutline: 'transparent',
  }

  themeConfig.components = {
    Input: controlToken,
    InputNumber: controlToken,
    Select: controlToken,
    Tree: {
      colorBgContainer: undefined,
      controlHeightSM: 24,
    },
    TreeSelect: controlToken,
  }

  return themeConfig
}

export interface ConfigProviderProps {
  componentToken?: OverrideToken
  children: ReactNode
}

export const ConfigProvider: FC<ConfigProviderProps> = ({ children, componentToken }) => {
  setupStyled({ ThemeContext })
  const { themeMode } = useAppStore(
    (st) => ({
      themeMode: st.themeMode,
    }),
    shallow
  )
  const { appearance } = useThemeMode()
  const studioTheme = useStudioAntdTheme(appearance)

  if (componentToken) {
    studioTheme.components = { ...studioTheme.components, ...componentToken }
  }

  return (
    <ThemeProvider theme={studioTheme} themeMode={themeMode}>
      {children}
    </ThemeProvider>
  )
}

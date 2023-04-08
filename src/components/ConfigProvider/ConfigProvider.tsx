import { createStudioAntdTheme } from '@/components/theme'
import { useAppStore } from '@/store'
import { AntdToken, ThemeAppearance, ThemeProvider, setupStyled, useAntdToken, useThemeMode } from 'antd-style'
import type { OverrideToken } from 'antd/es/theme/interface'
import type { FC, ReactNode } from 'react'
import { ThemeContext } from 'styled-components'
import { shallow } from 'zustand/shallow'

/**
 * @title Studio 主题配置钩子
 * @param appearance - 主题外观
 * @returns Studio 主题配置
 */
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

/**
 * @title 配置提供器组件属性
 */
export interface ConfigProviderProps {
  /**
   * @title 覆盖组件的主题样式
   */
  componentToken?: OverrideToken
  /**
   * @title 子组件
   */
  children: ReactNode
}

/**
 * @title 配置提供器组件
 */
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

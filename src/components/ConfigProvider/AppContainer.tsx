import { GetAntdThemeConfig, STUDIO_UI_PREFIX } from '@/components/theme'
import { ThemeConfig } from 'antd/es/config-provider/context'
import type { FC, PropsWithChildren } from 'react'

import {
  createStudioAntdTheme,
  getStudioStylish,
  getStudioToken,
  ThemeAppearance,
  ThemeMode,
  ThemeProvider,
} from '@/components/theme'
import { OverrideAntdGlobalStyles } from '../EditorComponent/override'

/**
 * @title 应用容器属性
 */
export interface AppContainerProps {
  /**
   * @title 主题外观
   */
  appearance?: ThemeAppearance
  /**
   * @title 主题模式
   * @enum ['light', 'dark']
   * @enumNames ['亮色', '暗色']
   * @default 'light'
   */
  themeMode?: ThemeMode
  /**
   * @title 主题配置
   * @description 可以传入一个对象或者函数来生成主题配置
   */
  theme?: ThemeConfig | GetAntdThemeConfig
}

export const AppContainer: FC<PropsWithChildren<AppContainerProps>> = ({ children, theme, appearance, themeMode }) => (
  <ThemeProvider
    prefixCls={STUDIO_UI_PREFIX}
    appearance={appearance}
    themeMode={themeMode}
    // 以下都是自定义主题
    theme={theme ?? createStudioAntdTheme}
    customToken={getStudioToken}
    customStylish={getStudioStylish}
  >
    <OverrideAntdGlobalStyles />
    {children}
  </ThemeProvider>
)

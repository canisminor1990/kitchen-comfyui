import { darkLogo, lightLogo } from '@/components/Header/style'
import { useThemeMode } from 'antd-style'
import React from 'react'

interface LogoProps {
  /**
   * @title 尺寸
   * @description Logo 的大小
   */
  size?: number
  /**
   * @title 样式
   * @description Logo 的样式
   */
  style?: React.CSSProperties
}

const Logo: React.FC<LogoProps> = ({ size = 20, style }) => {
  const { isDarkMode } = useThemeMode()
  return <img src={isDarkMode ? darkLogo : lightLogo} alt="logo" style={{ height: size, ...style }} />
}

export default React.memo(Logo)

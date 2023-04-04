import { darkLogo, lightLogo } from '@/components/Header/style'
import { ThemeMode } from 'antd-style'
import React from 'react'

interface LogoProps {
  themeMode: ThemeMode
  size?: number
  style?: React.CSSProperties
}

const Logo: React.FC<LogoProps> = ({ themeMode, size = 20, style }) => (
  <img src={themeMode === 'light' ? lightLogo : darkLogo} alt="logo" style={{ height: size, ...style }} />
)

export default React.memo(Logo)

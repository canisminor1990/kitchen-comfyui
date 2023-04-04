import { useAppStore } from '@/store'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { shallow } from 'zustand/shallow'

const darkLogo = 'https://gw.alipayobjects.com/zos/bmw-prod/9ecb2822-1592-4cb0-a087-ce0097fef2ca.svg'
const lightLogo = 'https://gw.alipayobjects.com/zos/bmw-prod/e146116d-c65a-4306-a3d2-bb8d05e1c49b.svg'

const View = styled.div`
  height: 46px;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colorBgContainer};
  border-bottom: 1px solid ${({ theme }) => theme.colorBorderSecondary};
`
interface HeaderProps {
  children?: ReactNode
}
const Header: React.FC<HeaderProps> = ({ children }) => {
  const { themeMode } = useAppStore(
    (st) => ({
      themeMode: st.themeMode,
    }),
    shallow
  )
  return (
    <View>
      <img src={themeMode === 'light' ? lightLogo : darkLogo} alt="logo" style={{ height: 20, marginRight: 36 }} />
      {children}
    </View>
  )
}

export default React.memo(Header)

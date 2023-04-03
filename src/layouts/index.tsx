import { Layout, Segmented } from 'antd'
import { ThemeProvider, setupStyled, type ThemeMode } from 'antd-style'
import 'antd/dist/reset.css'
import { ThemeContext } from 'styled-components'
import { Outlet } from 'umi'
import GlobalStyle from './GlobalStyle'
import { useStore } from './useStore'

const { Header } = Layout
const options = [
  { label: '自动', value: 'auto' },
  { label: '亮色', value: 'light' },
  { label: '暗色', value: 'dark' },
]

const Editor: React.FC = () => {
  setupStyled({ ThemeContext })
  const themeMode = useStore()

  return (
    <ThemeProvider themeMode={themeMode}>
      <GlobalStyle />
      <Layout style={{ width: '100vw', height: '100vh' }}>
        <Header>
          <Segmented value={themeMode} onChange={(v) => useStore.setState(v as ThemeMode)} options={options} />
        </Header>
        <Outlet />
      </Layout>
    </ThemeProvider>
  )
}

export default Editor

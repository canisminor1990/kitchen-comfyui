import { Layout } from 'antd'
import { ThemeProvider } from 'antd-style'
import 'antd/dist/reset.css'
import { Outlet } from 'umi'

export default () => {
  return (
    <ThemeProvider themeMode={'auto'}>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  )
}

import { ThemeProvider } from 'antd-style'
import App from './App'

export default () => {
  return (
    <ThemeProvider themeMode={'auto'}>
      <App />
    </ThemeProvider>
  )
}

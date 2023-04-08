const defaultConfig = {
  host: window.location.host,
  protocol: window.location.protocol,
}

const hotReloadConfig = {
  host: process.env.REACT_APP_API_URL,
  protocol: 'http:',
}

const config =
  process.env.NODE_ENV === 'development' ? (process.env.MOCK ? defaultConfig : hotReloadConfig) : defaultConfig

export default config

if (process.env.NODE_ENV === 'development') {
  console.table({ host: config.host, isMock: Boolean(process.env.MOCK) })
}

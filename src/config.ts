const defaultConfig = {
  host: window.location.host,
  protocol: window.location.protocol,
}

const hotReloadConfig = {
  host: 'localhost:8188',
  protocol: 'http:',
}

const config =
  process.env.NODE_ENV === 'development' ? (process.env.MOCK ? defaultConfig : hotReloadConfig) : defaultConfig

if (process.env.NODE_ENV === 'development') {
  console.table({ ...config, isMock: Boolean(process.env.MOCK) })
}

export function getBackendUrl(endpoint: string): string {
  return `${config.protocol}//${config.host}${endpoint}`
}

export default config

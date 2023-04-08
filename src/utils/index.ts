import config from '@/config'

export * from './connection'
export * from './input'
export * from './node'
export * from './persistence'
export * from './queue'
export * from './widget'

/**
 * 返回后端接口完整地址
 * @param endpoint - 接口地址
 * @returns 完整地址
 */
export const getBackendUrl = (endpoint: string): string => `${config.protocol}//${config.host}${endpoint}`

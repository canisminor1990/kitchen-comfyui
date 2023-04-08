import type { MenuProps } from 'antd'

/**
 * @title 颜色列表
 * @type {Array}
 * @ignore
 */
export const colorList: Array<string> = [
  '',
  '#f5222d',
  '#fa541c',
  '#fa8c16',
  '#faad14',
  '#fadb14',
  '#a0d911',
  '#52c41a',
  '#13c2c2',
  '#1677ff',
]

/**
 * @title 颜色选择菜单
 * @type {Array}
 * @ignore
 */
export const ColorMenu: MenuProps['items'] = colorList.map((c: string | null, i: number) => ({
  label: <div style={{ background: c || '#eee', width: 16, height: 16, borderRadius: '50%' }} />,
  key: i,
}))

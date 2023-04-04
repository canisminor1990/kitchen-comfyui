import type { MenuProps } from 'antd'

export const colorList = [
  null,
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
export const ColorMenu: MenuProps['items'] = colorList.map((c, i) => ({
  label: <div style={{ background: c || '#eee', width: 16, height: 16, borderRadius: '50%' }} />,
  key: i,
}))

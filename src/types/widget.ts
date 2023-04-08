import { SDNodeModify } from '@/types/node'
import { PropertyKey, WidgetKey } from './base'
import { InputData } from './input'
import { Flow } from './output'

/**
 * Widget 对象
 * @property name - Widget 键
 * @property input - 输入信息
 * @property output - 输出信息
 * @property output_name - 输出名称
 * @property category - 分类名称
 * @property description - 描述信息
 */
export interface Widget extends SDNodeModify {
  name: WidgetKey
  input: { required: Record<PropertyKey, InputData> }
  output: Flow[]
  output_name: Flow[]
  category: string
  description?: string
}

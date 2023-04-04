import { PropertyKey, WidgetKey } from './base'
import { InputData } from './input'
import { Flow } from './output'

export interface Widget {
  name: WidgetKey
  input: { required: Record<PropertyKey, InputData> }
  output: Flow[]
  output_name: Flow[]
  category: string
  description?: string
  width?: number
  height?: number
}

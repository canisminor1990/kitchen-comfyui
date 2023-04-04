import { PropertyKey, WidgetKey } from './base'
import { InputData } from './input'
import { Flow } from './output'

export interface Widget {
  name: WidgetKey
  input: { required: Record<PropertyKey, InputData> }
  output: Flow[]
  category: string
}

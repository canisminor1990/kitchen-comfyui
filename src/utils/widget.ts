import { PropertyKey, SDNode, Widget } from '@/types'
import { checkInput } from './input'
// 用于处理节点数据的函数
export function getDefaultFields(widget: Widget): Record<PropertyKey, any> {
  const fields: Record<PropertyKey, any> = {}
  for (const [key, input] of Object.entries(widget.input.required)) {
    if (checkInput.isBool(input)) {
      fields[key] = input[1].default ?? false
    } else if (checkInput.isFloat(input)) {
      fields[key] = input[1].default ?? 0.0
    } else if (checkInput.isInt(input)) {
      fields[key] = input[1].default ?? 0
    } else if (checkInput.isString(input)) {
      fields[key] = ''
    } else if (checkInput.isList(input)) {
      fields[key] = input[0][0]
    }
  }
  return fields
}

export function fromWidget(widget: Widget): SDNode {
  return { widget: widget.name, fields: getDefaultFields(widget) }
}

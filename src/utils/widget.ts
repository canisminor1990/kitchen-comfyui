import { PropertyKey, SDNode, Widget } from '@/types'
import { checkInput } from './input'

/**
 * 获取默认节点数据
 * @param widget - 组件信息
 * @returns 节点数据
 */
export const getDefaultFields = (widget: Widget): Record<PropertyKey, any> => {
  const fields: Record<PropertyKey, any> = {}
  Object.entries(widget.input.required).forEach(([key, input]) => {
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
  })
  return fields
}

/**
 * 根据组件信息生成节点数据
 * @param widget - 组件信息
 * @returns 节点数据
 */
export const fromWidget = (widget: Widget): SDNode => ({ widget: widget.name, fields: getDefaultFields(widget) })

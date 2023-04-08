import { Flow } from './output'

/**
 * 数字类型参数属性
 * @property default - 默认值
 * @property min - 最小值
 * @property max - 最大值
 * @property randomizable - 是否可随机
 */
export interface NumberProps<A> {
  default?: A
  min?: A
  max?: A
  randomizable?: boolean
}

/**
 * 字符串类型参数属性
 * @property multiline - 是否支持多行输入
 * @property dynamic_prompt - 是否支持动态提示
 */
export interface StringProps {
  multiline?: boolean
  dynamic_prompt?: boolean
}

/**
 * 布尔类型参数属性
 * @property default - 默认值
 */
export interface BoolProps {
  default?: boolean
}

/**
 * 参数类型
 * @typeparam K - 参数类型键
 */
export type Parameter<K extends keyof InputType> = [K, InputType[K][1]]

/**
 * 输入类型
 */
export interface InputType {
  BOOL: [boolean, BoolProps]
  INT: [number, NumberProps<number>]
  FLOAT: [number, NumberProps<number>]
  STRING: [string, StringProps]
}

/**
 * 输入数据类型：参数、字符串数组或 Flow 对象
 * @typeparam K - 参数类型键
 */
export type InputData = Parameter<keyof InputType> | [string[]] | [Flow]

import { InputData, Parameter } from '@/types'
import { isArray } from 'lodash-es'

// 用于检查输入参数的函数
class CheckInputClass {
  /**
   * 判断输入参数是否为布尔类型
   * @param i - 输入参数
   * @returns 如果输入参数为布尔类型，返回 true，否则返回 false
   */
  isBool(i: InputData): i is Parameter<'BOOL'> {
    if (!isArray(i)) return false
    return i[0] === 'BOOL'
  }

  /**
   * 判断输入参数是否为整数类型
   * @param i - 输入参数
   * @returns 如果输入参数为整数类型，返回 true，否则返回 false
   */
  isInt(i: InputData): i is Parameter<'INT'> {
    if (!isArray(i)) return false
    return i[0] === 'INT'
  }

  /**
   * 判断输入参数是否为浮点数类型
   * @param i - 输入参数
   * @returns 如果输入参数为浮点数类型，返回 true，否则返回 false
   */
  isFloat(i: InputData): i is Parameter<'FLOAT'> {
    if (!isArray(i)) return false
    return i[0] === 'FLOAT'
  }

  /**
   * 判断输入参数是否为字符串类型
   * @param i - 输入参数
   * @returns 如果输入参数为字符串类型，返回 true，否则返回 false
   */
  isString(i: InputData): i is Parameter<'STRING'> {
    if (!isArray(i)) return false
    return i[0] === 'STRING'
  }

  /**
   * 判断输入参数是否为列表类型
   * @param i - 输入参数
   * @returns 如果输入参数为列表类型，返回 true，否则返回 false
   */
  isList(i: InputData): i is [string[]] {
    if (!isArray(i)) return false
    return Array.isArray(i[0])
  }

  /**
   * 判断输入参数是否为参数或列表类型
   * @param i - 输入参数
   * @returns 如果输入参数为参数或列表类型，返回 true，否则返回 false
   */
  isParameterOrList(i: InputData): boolean {
    if (!isArray(i)) return false
    return this.isBool(i) || this.isInt(i) || this.isFloat(i) || this.isString(i) || this.isList(i)
  }
}

/**
 * 用于检查输入参数的实例
 */
export const checkInput = new CheckInputClass()

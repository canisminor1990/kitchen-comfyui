import { InputData, Parameter } from '@/types'
import { isArray } from 'lodash-es'

// 用于检查输入参数的函数
class CheckInputClass {
  isBool(i: InputData): i is Parameter<'BOOL'> {
    if (!isArray(i)) return false
    return i[0] === 'BOOL'
  }

  isInt(i: InputData): i is Parameter<'INT'> {
    if (!isArray(i)) return false
    return i[0] === 'INT'
  }

  isFloat(i: InputData): i is Parameter<'FLOAT'> {
    if (!isArray(i)) return false
    return i[0] === 'FLOAT'
  }

  isString(i: InputData): i is Parameter<'STRING'> {
    if (!isArray(i)) return false
    return i[0] === 'STRING'
  }

  isList(i: InputData): i is [string[]] {
    if (!isArray(i)) return false
    return Array.isArray(i[0])
  }

  isParameterOrList(i: InputData): boolean {
    if (!isArray(i)) return false
    return this.isBool(i) || this.isInt(i) || this.isFloat(i) || this.isString(i) || this.isList(i)
  }
}

export const checkInput = new CheckInputClass()

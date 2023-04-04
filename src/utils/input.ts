import { InputData, Parameter } from '@/types'

// 用于检查输入参数的函数
class CheckInputClass {
  isBool(i: InputData): i is Parameter<'BOOL'> {
    return i[0] === 'BOOL'
  }

  isInt(i: InputData): i is Parameter<'INT'> {
    return i[0] === 'INT'
  }

  isFloat(i: InputData): i is Parameter<'FLOAT'> {
    return i[0] === 'FLOAT'
  }

  isString(i: InputData): i is Parameter<'STRING'> {
    return i[0] === 'STRING'
  }

  isList(i: InputData): i is [string[]] {
    return Array.isArray(i[0])
  }

  isParameterOrList(i: InputData): boolean {
    return this.isBool(i) || this.isInt(i) || this.isFloat(i) || this.isString(i) || this.isList(i)
  }
}

export const checkInput = new CheckInputClass()

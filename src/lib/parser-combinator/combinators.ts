import { IParser, IResult } from './types'
import { success, failure } from './result'

export function regex(_regex: RegExp, expected?: string): IParser<string> {
  const regexFlags = Array.from(new Set(_regex.flags + 'g')).join('')
  const regex = new RegExp(_regex.source, regexFlags)
  return (context) => {
    regex.lastIndex = context.index
    const result = regex.exec(context.text)
    if (result && result.index === context.index) {
      return success(result[0], { ...context, index: context.index + result[0].length })
    } else {
      return failure(expected || regex.source, context)
    }
  }
}

export function string(string: string): IParser<string> {
  return (context) => {
    const newIndex = context.index + string.length
    if (context.text.substring(context.index, newIndex) === string) {
      return success(string, { ...context, index: newIndex })
    }
    return failure(string, context)
  }
}

export function map<T, U>(parser: IParser<T>, fun: (value: T) => U): IParser<U> {
  return (context) => {
    const result = parser(context)
    return result.success === true
      ? success(fun(result.value), result.context)
      : failure(result.expected, result.context)
  }
}
export function sequence<T>(...parsers: IParser<T>[]): IParser<T[]> {
  return (context) => {
    const values = []
    let newContext = context
    for (const parser of parsers) {
      const result = parser(newContext)
      if (result.success === false) {
        return result
      }
      newContext = result.context
      values.push(result.value)
    }
    return success(values, newContext)
  }
}

export function many<T>(parser: IParser<T>): IParser<T[]> {
  return (context) => {
    const result = many1(parser)(context)
    return result.success ? result : success([], result.context)
  }
}

export function any<T>(...parsers: IParser<T>[]): IParser<T> {
  return (context) => {
    let bestResult: IResult<T> | null = null
    for (const parser of parsers) {
      const result = parser(context)
      if (result.success) return result
      if (!bestResult || bestResult.context.index < result.context.index) {
        bestResult = result
      }
    }
    return bestResult!
  }
}

export function optional<T>(parser: IParser<T>, defaultValue: T | null = null): IParser<T | null> {
  return any(parser, (context) => success(defaultValue, context))
}

export function many1<T>(parser: IParser<T>): IParser<T[]> {
  return (context) => {
    const values = []
    let newContext = context
    let expected = ''
    while (true) {
      const result = parser(newContext)
      if (result.success === false) {
        expected = result.expected
        break
      }
      values.push(result.value)
      newContext = result.context
    }
    return values.length > 0 ? success(values, newContext) : failure(expected, context)
  }
}

export function pipe<T>(...parsers: [...IParser<any>[], IParser<T>]): IParser<T> {
  return map(sequence(...parsers), (values) => values[values.length - 1])
}

export function lpipe<T>(...parsers: [IParser<T>, ...IParser<any>[]]): IParser<T> {
  return map(sequence(...parsers), (values) => values[0])
}

export const eof: IParser<null> = (context) =>
  context.text.length === context.index ? success(null, context) : failure('eof', context)
export const eol: IParser<null> = map(regex(/\n/, 'eol'), () => null)
export const ws: IParser<null> = map(regex(/\s*/), () => null)
export const ws1: IParser<null> = map(regex(/\s+/), () => null)

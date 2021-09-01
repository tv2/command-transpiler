import { IParser, IResult } from './types'
import { success, failure } from './result'

/**
 * @desc   Parse a regular expression.
 */
export function regex(pattern: RegExp | string, expected?: string): IParser<string> {
  const flags = new Set(pattern instanceof RegExp ? pattern.flags + 'g' : 'g')
  const regex = new RegExp(pattern instanceof RegExp ? pattern.source : pattern, Array.from(flags).join(''))
  return (context) => {
    regex.lastIndex = context.index
    const result = regex.exec(context.text)
    return result && result.index === context.index
      ? success(result[0], { ...context, index: context.index + result[0].length })
      : failure(expected || regex.source, context)
  }
}

/**
 * @desc   Parse a string literal.
 */
export function string(text: string): IParser<string> {
  return (context) => {
    const index = context.index + text.length
    return context.text.substring(context.index, index) === text
      ? success(text, { ...context, index })
      : failure(text, context)
  }
}

/**
 * @desc   Transforms the content of a parser from one type to another.
 */
export function map<T, U>(parser: IParser<T>, fun: (value: T) => U): IParser<U> {
  return (context) => {
    const result = parser(context)
    return result.success === true
      ? success(fun(result.value), result.context)
      : failure(result.expected, result.context)
  }
}

/**
 * @desc   Parse a sequence of parsers.
 * TODO: Find out how to map sequence of types here (perhaps keyof?)
 */
export function sequence<T>(...parsers: IParser<T>[]): IParser<T[]> {
  return (context) => {
    const values = []
    let newContext = context
    for (const parser of parsers) {
      const result = parser(newContext)
      if (result.success === false) return result
      newContext = result.context
      values.push(result.value)
    }
    return success(values, newContext)
  }
}

/**
 * @desc   Parse zero or more occurences of a parser.
 */
export function many<T>(parser: IParser<T>): IParser<T[]> {
  return (context) => {
    const result = many1(parser)(context)
    return result.success ? result : success([], result.context)
  }
}

/**
 * @desc   Parse one or more occurences of a parser.
 */
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

/**
 * @desc   Parse one of a sequnce of parsers. Failure is returned for parser that parsed most content.
 */
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

/**
 * @desc   Make a parser optional. Returns the set default value on failure.
 */
// TODO: Set type constraints such that resulting type is not null if defaultValue is set to other than null
export function optional<T>(parser: IParser<T>, defaultValue: T | null = null): IParser<T | null> {
  return any(parser, (context) => success(defaultValue, context))
}

/**
 * @desc   Parse a sequence of parser, returning the last parsed result
 */
export function pipe<T>(...parsers: [...IParser<any>[], IParser<T>]): IParser<T> {
  return map(sequence(...parsers), (values) => values[values.length - 1])
}

/**
 * @desc   Parse a sequence of parser, returning the first parsed result
 */
export function lpipe<T>(...parsers: [IParser<T>, ...IParser<any>[]]): IParser<T> {
  return map(sequence(...parsers), (values) => values[0])
}

/**
 * @desc   Create empty parser with return value
 */
export function pure<T>(value: T): IParser<T> {
  return (context) => success(value, context)
}

/**
 * @desc   Parse a end-of-file
 */
export const eof: IParser<null> = (context) =>
  context.text.length === context.index ? success(null, context) : failure('eof', context)

/**
 * @desc   Parse a single newline
 */
export const eol: IParser<null> = map(regex(/\n/, 'eol'), () => null)

/**
 * @desc   Parse zero or more occurences of whitespace
 */
export const ws: IParser<null> = map(regex(/\s*/), () => null)

/**
 * @desc   Parse one or more occurences of whitespace
 */
export const ws1: IParser<null> = map(regex(/\s+/), () => null)

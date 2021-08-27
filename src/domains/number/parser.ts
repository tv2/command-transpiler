import { string, regex, pipe, map, ws1, optional } from '../../lib/parser-combinator/combinators'
import { IParser } from '../../lib/parser-combinator'
import { IModifierBase, IModifierTool } from '../../parser/types'

export default function parseBaseModifier(): IParser<IModifierBase> {
  return map(string('number'), () => ({ domain: 'number', pattern: '[0-9]+', interpret: ({ value }) => value }))
}

export function toInteger(): IParser<IModifierTool> {
  return map(string('toInteger'), () => ({
    domain: 'number',
    modifier: 'toInteger',
    interpret: ({ value }) => parseInt(value, 10),
  }))
}

export function parseIncrement(): IParser<IModifierTool> {
  return map(pipe(string('inc'), optional(pipe(ws1, regex(/[0-9]+/)))), (amount) => ({
    domain: 'number',
    modifier: 'inc',
    args: {
      amount: parseInt(amount || '1', 10),
    },
    interpret: ({ value, args: { amount } }: any) => value + amount,
  }))
}

export function parseDecrement(): IParser<IModifierTool> {
  return map(pipe(string('dec'), optional(pipe(ws1, regex(/[0-9]+/)))), (amount) => ({
    domain: 'number',
    modifier: 'dec',
    args: {
      amount: parseInt(amount || '1', 10),
    },
    interpret: ({ value, args: { amount } }: any) => value - amount,
  }))
}

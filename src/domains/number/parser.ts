import { string, regex, pipe, map, ws1, optional } from '../../lib/parser-combinator/combinators'
import { IParser } from '../../lib/parser-combinator'

export default function parseBaseModifier(): IParser<any> {
  return map(string('number'), () => ({ domain: 'number' }))
}

export function toInteger(): IParser<any> {
  return map(string('toInteger'), () => ({ domain: 'number', modifier: 'toInteger' }))
}

export function parseIncrement(): IParser<any> {
  return map(pipe(string('inc'), optional(pipe(ws1, regex(/[0-9]+/)))), (amount) => ({
    domain: 'number',
    modifier: 'inc',
    amount: parseInt(amount || '1', 10),
  }))
}

export function parseDecrement(): IParser<any> {
  return map(pipe(string('dec'), optional(pipe(ws1, regex(/[0-9]+/)))), (amount) => ({
    domain: 'number',
    modifier: 'dec',
    amount: parseInt(amount || '1', 10),
  }))
}

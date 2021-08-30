import { map, string, pipe, optional, ws1, regex } from '../../utilities/parser-combinator/combinators'
import { IParser } from '../../utilities/parser-combinator'
import { IModifier, IBaseModifier } from '../../common/types'

const domain = 'number'

export default function parseBaseModifier(): IParser<IBaseModifier> {
  return map(string(domain), () => ({ domain, modifier: 'base', pattern: '[0-9]+' }))
}

export function parseToInteger(): IParser<IModifier> {
  return map(string('toInteger'), () => ({
    domain: 'number',
    modifier: 'toInteger',
  }))
}

export function parseInc(): IParser<IModifier> {
  return map(pipe(string('inc'), optional(pipe(ws1, regex(/[0-9]+/)))), (amount) => ({
    domain: 'number',
    modifier: 'inc',
    args: {
      amount: parseInt(amount || '1', 10),
    },
  }))
}

export function parseDec(): IParser<IModifier> {
  return map(pipe(string('dec'), optional(pipe(ws1, regex(/[0-9]+/)))), (amount) => ({
    domain: 'number',
    modifier: 'dec',
    args: {
      amount: parseInt(amount || '1', 10),
    },
  }))
}

export function parseMod(): IParser<IModifier> {
  return map(pipe(string('mod'), pipe(ws1, regex(/[0-9]+/))), (amount) => ({
    domain: 'number',
    modifier: 'mod',
    args: {
      amount: parseInt(amount, 10),
    },
  }))
}

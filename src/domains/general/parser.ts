import { pipe, map, string, ws1 } from '../../utilities/parser-combinator/combinators'
import { IParser } from '../../utilities/parser-combinator'
import { IModifier } from '../../common/types'
import { parseLiteral } from '../../base/parser'

const domain = 'general'

export function parseLength(): IParser<IModifier> {
  return map(string('length'), () => ({ domain, modifier: 'length' }))
}

export function parseToString(): IParser<IModifier> {
  return map(string('toString'), () => ({ domain, modifier: 'toString' }))
}

export function parseEqual(): IParser<IModifier> {
  return map(pipe(string('equal'), ws1, parseLiteral()), (value) => ({ domain, modifier: 'equal', args: { value } }))
}

export function parseNot(): IParser<IModifier> {
  return map(string('not'), () => ({ domain, modifier: 'not' }))
}

import { pipe, map, string, ws1, many1, any, optional } from '../../utilities/parser-combinator/combinators'
import { IParser } from '../../utilities/parser-combinator'
import { IModifier } from '../../common/types'
import { parseLiteral, parseVarname } from '../../base/parser'

const domain = 'general'

export function parseLength(): IParser<IModifier> {
  return map(string('length'), () => ({ domain, modifier: 'length' }))
}

export function parseToString(): IParser<IModifier> {
  return map(string('toString'), () => ({ domain, modifier: 'toString' }))
}

export function parseDefault(): IParser<IModifier> {
  return map(pipe(string('default'), ws1, parseLiteral()), (value) => ({
    domain,
    modifier: 'default',
    args: { value },
  }))
}

export function parseEqual(): IParser<IModifier> {
  return map(pipe(string('equal'), ws1, parseLiteral()), (value) => ({ domain, modifier: 'equal', args: { value } }))
}

export function parseNot(): IParser<IModifier> {
  return map(string('not'), () => ({ domain, modifier: 'not' }))
}

export function parseExists(): IParser<IModifier> {
  return map(string('exists'), () => ({ domain, modifier: 'exists' }))
}

export function parseIn(): IParser<IModifier> {
  return map(pipe(string('in'), any<string|any[]>(pipe(ws1, parseVarname()), many1(pipe(ws1, parseLiteral())))), (value) => ({
    domain,
    modifier: 'in',
    args: { value },
  }))
}

export function parseKeep(): IParser<IModifier> {
  return map(pipe(string('keep'), optional(pipe(ws1, parseVarname()))), (varname) => ({ domain, modifier: 'keep', args: { varname } }))
}

export function parseVoid(): IParser<IModifier> {
  return map(string('void'), () => ({ domain, modifier: 'void' }))
}



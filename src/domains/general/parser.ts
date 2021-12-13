import { pipe, map, string, ws1, many1, any, optional } from '../../utilities/parser-combinator/combinators'
import { IParser } from '../../utilities/parser-combinator'
import { IModifier } from '../../common/types'
import { parseLiteral, parseExtendedLiteral, parseVarname, parseVarnameLiteral, parseNumberLiteral } from '../../base/parser'

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
  return map(pipe(string('equal'), ws1, parseExtendedLiteral()), (value) => ({ domain, modifier: 'equal', args: { value } }))
}

export function parseGreater(): IParser<IModifier> {
  return map(pipe(string('greater'), ws1, any<any>(parseNumberLiteral(), parseVarnameLiteral())), (value) => ({ domain, modifier: 'greater', args: { value } }))
}

export function parseLess(): IParser<IModifier> {
  return map(pipe(string('less'), ws1, any<any>(parseNumberLiteral(), parseVarnameLiteral())), (value) => ({ domain, modifier: 'less', args: { value } }))
}

export function parseNot(): IParser<IModifier> {
  return map(string('not'), (modifier: string) => ({ domain, modifier }))
}

export function parseExist(): IParser<IModifier> {
  return map(string('exist'), (modifier: string) => ({ domain, modifier }))
}

export function parseIn(): IParser<IModifier> {
  return map(pipe(string('in'), any<object|any[]>(pipe(ws1, parseVarnameLiteral()), many1(pipe(ws1, parseLiteral())))), (value) => ({
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



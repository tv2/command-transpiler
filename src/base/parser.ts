import { IParser } from '../utilities/parser-combinator'
import { pipe, map, sequence, regex, string, ws, lpipe, any } from '../utilities/parser-combinator/combinators'

export function parseVarname(): IParser<string> {
  return lpipe(regex(/[a-zæøå_][a-zæøå0-9_]*/i), ws)
}

export function parseStringLiteral(): IParser<string> {
  return map(sequence(string('"'), regex(/(\\"|[^"])+/), string('"')), ([_, text]: string[]) => text)
}

export function parseNumberLiteral(): IParser<number> {
  return map(regex(/[0-9]+/), (text) => parseInt(text, 10))
}

export function parseVarnameLiteral(): IParser<{ type: 'variable', varname: string }> {
  return map(parseVarname(), (varname: string) => ({ type: 'variable', varname }))
}

export function parseLiteral(): IParser<any> {
  return any<any>(parseStringLiteral(), parseNumberLiteral())
}

export function parseExtendedLiteral(): IParser<any> {
  return any<any>(parseStringLiteral(), parseNumberLiteral(), parseVarnameLiteral())
}

export function parseParens<T>(parser: IParser<T>): IParser<T> {
  return pipe(string('('), ws, lpipe(parser, ws, string(')')))
}

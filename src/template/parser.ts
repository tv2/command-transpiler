import {
  string,
  ws,
  lpipe,
  pipe,
  many,
  any,
  eof,
  regex,
  map,
  sequence,
} from '../utilities/parser-combinator/combinators'
import { IAST, LeafKind, ILeaf, IStaticLeaf } from './types'
import { IResult, IParser } from '../utilities/parser-combinator'

import { parseModifiers, parseVarname } from '../common/parser'

function parseStaticLeaf(): IParser<ILeaf> {
  return map<string, IStaticLeaf>(regex(/((?!#{).)+/, 'plain text'), (text) => ({
    type: LeafKind.Static,
    text,
  }))
}

function parseModifiableLeaf(): IParser<ILeaf> {
  return map(
    sequence<any>(pipe(string('#{'), ws, parseVarname()), lpipe(parseModifiers(), string('}'))),
    ([varname, modifiers]: any) => ({ type: LeafKind.Modifiable, varname, modifiers })
  )
}

function parseLeaf(): IParser<ILeaf> {
  return any(parseModifiableLeaf(), parseStaticLeaf())
}

const parser = lpipe(many(parseLeaf()), eof)

export function parse(text: string, index: number = 0): IResult<IAST> {
  return parser({ text, index })
}

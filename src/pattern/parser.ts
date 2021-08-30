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
  optional,
} from '../utilities/parser-combinator/combinators'
import { IAST, LeafKind, ILeaf, IStaticLeaf, IModifiableLeaf, IModifiableLeafs } from './types'
import { IResult, IParser } from '../utilities/parser-combinator'

import { parseBaseModifier, parseModifiers, parseVarname } from '../common/parser'

function parseStaticLeaf(): IParser<ILeaf> {
  return map<string, IStaticLeaf>(regex(/((?!#{).)+/, 'plain text'), (text) => ({
    type: LeafKind.Static,
    text,
  }))
}

function parseOptionalVarname(): IParser<string | null> {
  return optional(pipe(string(':'), ws, parseVarname()))
}

function parseModifiableLeaf(): IParser<ILeaf> {
  return map(
    sequence<any>(pipe(string('#{'), ws, parseBaseModifier()), pipe(ws, parseOptionalVarname()), lpipe(parseModifiers(), string('}'))),
    ([base, varname, modifiers]: any) => ({ type: LeafKind.Modifiable, base, varname, modifiers })
  )
}

function parseLeaf(): IParser<ILeaf> {
  return any(parseModifiableLeaf(), parseStaticLeaf())
}

const parser = lpipe(many(parseLeaf()), eof)

export function parse(text: string, index: number = 0): IResult<IAST> {
  return parser({ text, index })
}

/*************************************************************************/
/*************************************************************************/

function compilePatternStaticLeaf(leaf: IStaticLeaf): string {
  return leaf.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function compilePatternModifiableLeaf(leaf: IModifiableLeaf): string {
  return 'varname' in leaf ? `(?<${leaf.varname}>${leaf.base.pattern})` : ''
}

function compilePatternLeaf(leaf: ILeaf): string {
  switch (leaf.type) {
    case LeafKind.Static:
      return compilePatternStaticLeaf(leaf)
    case LeafKind.Modifiable:
      return compilePatternModifiableLeaf(leaf)
  }
}

export function compilePattern(ast: IAST, flags: string = ''): { pattern: RegExp; processors: IModifiableLeafs } {
  return {
    pattern: new RegExp(`^${ast.map((leaf) => compilePatternLeaf(leaf)).join('')}$`, flags),
    processors: ast.filter((leaf) => leaf.type === LeafKind.Modifiable) as IModifiableLeafs,
  }
}

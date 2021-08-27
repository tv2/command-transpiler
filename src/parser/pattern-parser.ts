import {
  ws,
  sequence,
  string,
  regex,
  lpipe,
  pipe,
  eof,
  many,
  any,
  map,
  optional,
} from '../lib/parser-combinator/combinators'
import { ILeaf, ILeafKind, IPlainText, IModifiable } from './types'
import { IParser, IResult } from '../lib/parser-combinator'
import { parseModifiableBase } from './base-parser'
import { parseModifiableModifiers } from './modifier-parser'

function parseModifiableVarname(): IParser<string | null> {
  return pipe(string(':'), ws, regex(/[a-zæøå_][a-zæøå0-9_]+/i))
}

function parseModifiableContent(): IParser<ILeaf> {
  return map(
    sequence<any>(
      parseModifiableBase(),
      pipe(ws, optional(parseModifiableVarname())),
      pipe(ws, parseModifiableModifiers())
    ),
    ([base, varname, modifiers]: any) => ({ type: ILeafKind.Modifiable, base, varname, modifiers })
  )
}

function parseModifiable(): IParser<IModifiable> {
  return map(
    sequence<any>(string('#{'), ws, parseModifiableContent(), ws, string('}')),
    ([_, _1, content]: any) => content
  )
}

function parsePlainText(): IParser<IPlainText> {
  return map<string, IPlainText>(regex(/((?!#{).)+/, 'plain text'), (text) => ({
    type: ILeafKind.PlainText,
    text,
  }))
}

const parser = lpipe(many(any<ILeaf>(parseModifiable(), parsePlainText())), eof)

export function parse(text: string, index: number = 0): IResult<ILeaf[]> {
  return parser({ text, index })
}

export function compilePattern(
  ast: ILeaf[],
  flags: string = ''
): { pattern: RegExp; modifiables: IModifiable[] } {
  const source = ast
    .map((leaf) => {
      switch (leaf.type) {
        case ILeafKind.PlainText:
          return leaf.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
        case ILeafKind.Modifiable:
          return leaf.varname !== null ? `(?<${leaf.varname}>${leaf.base!.pattern})` : ''
      }
    })
    .join('')
  return {
    pattern: new RegExp(`^${source}$`, flags),
    modifiables: ast.filter((leaf) => leaf.type === ILeafKind.Modifiable) as IModifiable[],
  }
}

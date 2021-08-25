import { ws, sequence, string, regex, lpipe, pipe, eof, many, any, map, optional } from '../lib/parser-combinator/combinators'
import { ILeaf, IPlainText, IModifiable } from './types'
import { IParser } from '../lib/parser-combinator'
import { parseModifiableBase } from './base-parser'
import { parseModifiableModifiers } from './modifier-parser'

function parseModifiableVarname(): IParser<string | null> {
  return pipe(string(':'), ws, regex(/[a-zæøå_][a-zæøå0-9_]+/i))
}

function parseModifiableContent(): IParser<ILeaf> {
  return map(sequence(parseModifiableBase(), pipe(ws, optional(parseModifiableVarname())), pipe(ws, parseModifiableModifiers())), ([base, varname, modifiers]: any) => ({ type: 'modifiable', base, varname, modifiers }))
}

function parseModifiable(): IParser<IModifiable> {
    return map(sequence<any>(string('#{'), ws, parseModifiableContent(), ws, string('}')), ([_,_1,content]: any) => content)
}

function parsePlainText(): IParser<IPlainText> {
  return map<string,IPlainText>(regex(/((?!#{).)+/, 'plain text'), (text) => ({
    type: 'plaintext',
    text,
  }))
}

const parser = lpipe(many(any<ILeaf>(parseModifiable(), parsePlainText())), eof)

export function parse(text: string, index: number = 0) {
  return parser({ text, index })
}


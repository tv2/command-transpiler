import { ws, sequence, string, regex, lpipe, eof, many, any, map } from '../lib/parser-combinator/combinators'
import { ILeaf, ILeafKind, IPlainText, IModifiable } from './types'
import { IParser } from '../lib/parser-combinator'
import { parseModifiableModifiers } from './modifier-parser'

function parseModifiableVarname(): IParser<string> {
  return regex(/[a-zæøå_][a-zæøå0-9_]+/i)
}

function parseModifiableContent(): IParser<ILeaf> {
  return map(sequence<string|any[]>(lpipe(parseModifiableVarname(), ws), parseModifiableModifiers()), ([varname, modifiers]: any) => ({ type: ILeafKind.Modifiable, varname, modifiers }))
}

function parseModifiable(): IParser<IModifiable> {
    return map(sequence<any>(string('#{'), ws, parseModifiableContent(), ws, string('}')), ([_,_1,content]: any) => content)
}

function parsePlainText(): IParser<IPlainText> {
  return map<string,IPlainText>(regex(/((?!#{).)+/, 'plain text'), (text) => ({
    type: ILeafKind.PlainText,
    text,
  }))
}

const parser = lpipe(many(any<ILeaf>(parseModifiable(), parsePlainText())), eof)

export function parse(text: string, index: number = 0) {
  return parser({ text, index })
}


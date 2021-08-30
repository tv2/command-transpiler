import { IModifier, IBaseModifier } from './types'
import { IParser } from '../utilities/parser-combinator'
import { string, ws, lpipe, pipe, many, any } from '../utilities/parser-combinator/combinators'

import numberBaseModifier, * as numberModifiers from '../domains/number/parser'
import pathBaseModifier, * as pathModifiers from '../domains/path/parser'
import wordBaseModifier, * as wordModifiers from '../domains/word/parser'
import stringBaseModifier, * as stringModifiers from '../domains/string/parser'
import regexBaseModifier, * as regexModifiers from '../domains/regex/parser'
import * as generalModifiers from '../domains/general/parser'

const baseModifiers: IParser<IBaseModifier>[] = [
  numberBaseModifier,
  pathBaseModifier,
  wordBaseModifier,
  stringBaseModifier,
  regexBaseModifier,
].map((modifier) => modifier())
const modifiers: IParser<IModifier>[] = [
  numberModifiers,
  pathModifiers,
  wordModifiers,
  generalModifiers,
  stringModifiers,
  regexModifiers,
]
  .map((domain) => Object.values(domain))
  .flat()
  .map((modifier) => modifier())

export function parseBaseModifier(): IParser<IBaseModifier> {
  return any(...baseModifiers)
}

export function parseModifiers(): IParser<IModifier[]> {
  return many(pipe(string('|'), ws, parseModifier()))
}

export function parseModifier(): IParser<IModifier> {
  return lpipe(any(...modifiers), ws)
}

export * from '../base/parser'

import { string, ws, any, many, pipe, lpipe } from '../lib/parser-combinator/combinators'
import * as numberModifiers from '../domains/number/parser'

export function parseModifiableModifiers() {
  return many(parseModifiableModifier())
}
export function parseModifiableModifier() {
  return pipe(string('|'), ws, lpipe(any(...Object.values(numberModifiers).map(fun => fun())), ws))
}

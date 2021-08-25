import { any, ws, lpipe } from '../lib/parser-combinator/combinators'
import numberBase from '../domains/number/parser'

export function parseModifiableBase() {
  return lpipe(any(numberBase()), ws)
}

import { IStore } from '../common/types'

export function evalLiteral(literal: any, store: IStore): string | number {
  if (typeof literal === 'object' && literal.type === 'variable') {
    return store[literal.varname]
  }
  return literal
}

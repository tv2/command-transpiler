import { IStore } from './types'
import { parse } from './parser'
import { interpret } from './interpreter'

export class Condition {
  readonly raw: string
  protected interpret: (store: IStore) => boolean

  constructor(raw: string) {
    this.raw = raw
    const condition = parse(raw)
    if (condition.success === false) {
      throw new Error('Condition parsing failed with context: ' + JSON.stringify(condition))
    }
    this.interpret = interpret(condition.value)
  }

  public check(store: IStore): boolean {
    return this.interpret(store)
  }
}

import { IStore, IResult } from './types'
import { parse } from './parser'
import { interpret } from './interpreter'

export class Template {
  readonly raw: string
  protected interpret: (store: IStore) => IResult

  constructor(raw: string) {
    this.raw = raw
    const template = parse(raw)
    if (template.success === false) {
      throw new Error('Pattern parsing failed with context: ' + JSON.stringify(template))
    }
    this.interpret = interpret(template.value)
  }

  public fill(store: IStore): IResult {
    return this.interpret(store)
  }
}

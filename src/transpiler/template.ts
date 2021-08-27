import { IStore } from '../interpreter/types'
import { template as templateParser } from '../parser'
import { template as templateInterpreter } from '../interpreter'

export class Template {
  readonly raw: string
  protected interpret: templateInterpreter.ITemplateInterpret

  constructor(raw: string) {
    this.raw = raw
    const template = templateParser.parse(raw)
    if (template.success === false) {
      throw new Error('Pattern parsing failed with context: ' + JSON.stringify(template))
    }
    this.interpret = templateInterpreter.interpret(template.value)
  }

  public fill(store: IStore): string {
    return this.interpret(store)
  }
}

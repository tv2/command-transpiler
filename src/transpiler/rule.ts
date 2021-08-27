import { IStore } from '../interpreter/types'
import { Pattern } from './pattern'
import { Template } from './template'
import { Condition } from './condition'

export class Rule {
  protected pattern: Pattern
  protected template: Template
  protected condition: Condition | null

  constructor(pattern: Pattern, template: Template, condition: Condition | null = null) {
    this.pattern = pattern
    this.template = template
    this.condition = condition
  }

  public match(text: string): IStore | null {
      return this.pattern.match(text)
  }

  public check(_: any, _1: IStore): boolean  {
    return true
  }

  public fill(_: IStore): string {
    return ''
  }

}

import { IStore } from '../interpreter/types'
import { Pattern } from './pattern'
import { Template } from './template'
import { Condition } from './condition'

export class Rule {
  protected pattern: Pattern
  protected template: Template
  protected condition: Condition | null

  constructor(pattern: Pattern | string, template: Template | string, condition: Condition | string | null = null) {
    this.pattern = typeof pattern === 'string' ? new Pattern(pattern) : pattern
    this.template = typeof template === 'string' ? new Template(template) : template
    this.condition = typeof condition === 'string' ? new Condition(condition) : condition
  }

  public match(text: string): IStore | null {
    return this.pattern.match(text)
  }

  public check(_: any, _1: IStore): boolean {
    return true
  }

  public fill(_: IStore): string {
    return ''
  }
}

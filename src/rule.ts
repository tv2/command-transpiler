import { IStore } from './common/types'
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

  public check(store: IStore): boolean {
    if (this.condition === null) return true
    return this.condition.check(store)
  }

  public fill(store: IStore): string {
    return this.template.fill(store)
  }

  public transpile(text: string, args: IStore): string | null {
    const data = this.match(text)
    if (data === null) return null
    const store = { ...data, ...args }
    if (!this.check(store)) return null
    return this.fill(store)
  }
}

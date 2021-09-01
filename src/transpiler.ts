import { IStore } from './common/types'
import { Rules } from './rules'

export class Transpiler {

  protected rules: Rules

  constructor(rules: Rules) {
    this.rules = rules
  }

  transpile(text: string, initialStore: IStore = {}): string | null {
    for (const rule of this.rules) {
      const argStore = rule.match(text)
      if (argStore == null) continue
      const store = { ...initialStore, ...argStore }
      if (!rule.check(store)) continue
      return rule.fill(store)
    }
    return null
  }
}



import { IStore } from './common/types'
import { Rules } from './rules'

export class Transpiler {

  protected rules: Rules

  constructor(rules: Rules) {
    this.rules = rules
  }

  transpile(text: string, initialStore: IStore = {}): { result: string, line: number } | null {
    for (const [line, rule] of this.rules.entries()) {
      const argStore = rule.match(text)
      if (argStore == null) continue
      const store = { ...initialStore, ...argStore }
      if (!rule.check(store)) continue
      return {
        result: rule.fill(store),
        line
      }
    }
    return null
  }
}



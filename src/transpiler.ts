import { IStore } from './common/types'
import { Rules } from './rules'

export class Transpiler {
  protected rules: Rules

  constructor(rules: Rules) {
    this.rules = rules
  }

  transpile(text: string, initialStore: IStore = {}): { result: string; store: IStore; line: number } | null {
    for (const [line, rule] of this.rules.entries()) {
      const argStore = rule.match(text)
      if (argStore == null) continue
      const store = { ...initialStore, ...argStore }
      if (!rule.check(store)) continue
      const resultAndStore = rule.fill(store)
      return {
        result: resultAndStore.result,
        store: resultAndStore.store,
        line,
      }
    }
    return null
  }
}

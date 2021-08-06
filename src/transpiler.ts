import { Rules } from './rules'
import { ModifierDomain } from './modifier'

export class Transpiler {
  protected rules: Rules
  constructor(rules: Rules = [], modifiers?: ModifierDomain) {
    this.rules = rules
    if (modifiers) this.rules.forEach(rule => rule.injectWith(modifiers))
  }

  transpile(input: string) {
    for (const rule of this.rules) {
      const result = rule.match(input)
      if (result !== null) {
        return rule.fill(result)
      }
    }
    throw new Error(`No transpilation rule matched the input: ${input}`)
  }
}

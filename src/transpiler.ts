import { Rules } from './rules'
import { ModifierDomain } from './modifier'

interface IVariables {
 [key: string]: any
}

export class Transpiler {
  protected rules: Rules
  constructor(rules: Rules = [], modifiers?: ModifierDomain) {
    this.rules = rules
    if (modifiers) this.rules.forEach(rule => rule.injectWith(modifiers))
  }

  transpile(input: string, variables: IVariables = {}): { line: number, result: string } {
    for (const [line,rule] of this.rules.entries()) {
      const result = rule.match(input)
      if (result !== null) {
        return { line, result: rule.fill({ ...variables, ...result }) }
      }
    }
    throw new Error(`No transpilation rule matched the input: ${input}`)
  }
}

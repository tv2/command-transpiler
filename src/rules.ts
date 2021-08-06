import { Pattern } from './pattern'
import { Template } from './template'
import { ModifierDomain } from './modifier'

export type Rules = Rule[]

/**
 * @desc   A wrapper for linking a pattern to a template.
 */
export class Rule {

  protected pattern: Pattern
  protected template: Template

  constructor(pattern: Pattern | string, template: Template | string) {
    this.pattern = pattern instanceof Pattern ? pattern : new Pattern(pattern)
    this.template = template instanceof Template ? template : new Template(template)
  }

  injectWith(modifierCollection: ModifierDomain) {
    modifierCollection.inject(this.pattern)
    modifierCollection.inject(this.template)
  }

  match(input: string) {
    return this.pattern.match(input)
  }

  fill(result: object) {
    return this.template.fill(result)
  }
}

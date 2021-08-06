import { ModifierDomain } from '../domain'

export class WordModifierDomain extends ModifierDomain {

  constructor() {
    super()
    this.domain = {
      base: /[a-zA-ZæøåÆØÅ0-9_][a-zA-Z0-9\-_]*/,
      pattern: /word/,
      modifier: (value) => value,
    }
    this.build()
  }
}


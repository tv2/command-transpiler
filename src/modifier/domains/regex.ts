import { ModifierDomain } from '../domain'

export class RegexModifierDomain extends ModifierDomain {

  constructor() {
    super()
    this.domain = {
      base: (domain: string) => {
        const regex = domain.match(/regex\s+\/(?<pattern>([^\/]|\\\/)+)\//)
        if (regex === null) {
          throw Error('Regex pattern not legal.')
        } else {
          return (regex.groups || {}).pattern
        }
        
      },
      pattern: /regex\s+\/([^\/]|\\\/)+\//,
      modifier: (value) => value,
    }

    this.build()
  }
}


import { Modifiable } from '../modifiable'
import { ModifierDomain } from './domain'

/**
 * @desc   A collection of modifier domains, that enables usage of multiple
 *         modifier domains in same modifiable part.
 */
export class ModifierCollection extends ModifierDomain {

  protected domains: ModifierDomain[]

  constructor(domains: ModifierDomain[] = []) {
    super()
    this.domains = domains
    this.tools = this.domains.map(domain => domain.tools).flat()
    this.domains.forEach(domain => { domain.tools = this.tools })
  }

  inject(modifiable: Modifiable) {
    this.domains.forEach(domain => domain.inject(modifiable))
  }
}

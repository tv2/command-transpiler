import { domains } from './modifier'
import { ModifierCollection } from './modifier'

/**
 * @desc   Default collection that uses all domains.
 */
export const defaultCollection = new ModifierCollection(
  Object.values(domains).map(domain => new domain())
)

import { map, string } from '../../utilities/parser-combinator/combinators'
import { IParser } from '../../utilities/parser-combinator'
import { IModifier, IBaseModifier } from '../../common/types'

const domain = 'path'

export default function parseBaseModifier(): IParser<IBaseModifier> {
  return map(string(domain), () => ({ domain, modifier: 'base', pattern: '[:\\\\/a-zA-ZæøåÆØÅ0-9\\-_\\.]+' }))
}

export function parseBasename(): IParser<IModifier> {
  return map(string('basename'), () => ({ domain, modifier: 'basename' }))
}

export function parseDir(): IParser<IModifier> {
  return map(string('dir'), () => ({ domain, modifier: 'dir' }))
}

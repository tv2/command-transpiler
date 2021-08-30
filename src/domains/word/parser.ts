import { map, string } from '../../utilities/parser-combinator/combinators'
import { IParser } from '../../utilities/parser-combinator'
import { IBaseModifier } from '../../common/types'

const domain = 'word'

export default function parseBaseModifier(): IParser<IBaseModifier> {
  return map(string(domain), () => ({ domain, modifier: 'base', pattern: '[a-zA-ZæøåÆØÅ0-9_][a-zA-Z0-9\-_]*' }))
}

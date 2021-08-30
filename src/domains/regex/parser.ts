import { map, string, pipe, lpipe, ws1, regex, optional, sequence } from '../../utilities/parser-combinator/combinators'
import { IParser } from '../../utilities/parser-combinator'
import { IBaseModifier } from '../../common/types'

const domain = 'regex'

export default function parseBaseModifier(): IParser<IBaseModifier> {
  return map(sequence<any>(pipe(string(domain), ws1, string('/'), lpipe(regex(/(\\\/|[^\/])+/),string('/'))), optional(regex(/[gmi]+/), '')), ([pattern, flags]) => ({ domain, modifier: 'base', pattern, args: { flags } }))
}

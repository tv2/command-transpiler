import { map, string, pipe, lpipe, ws1, regex } from '../../utilities/parser-combinator/combinators'
import { IParser } from '../../utilities/parser-combinator'
import { IBaseModifier } from '../../common/types'

const domain = 'string'

export default function parseBaseModifier(): IParser<IBaseModifier> {
  return map(pipe(string(domain), ws1, string('"'), lpipe(regex(/(\\"|[^"])+/),string('"'))), (pattern) => ({ domain, modifier: 'base', pattern }))
}

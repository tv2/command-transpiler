import { IModifier } from './types'

import interpretNumberDomain from '../domains/number/interpreter'
import interpretPathDomain from '../domains/path/interpreter'
import interpretWordDomain from '../domains/word/interpreter'
import interpretGeneralDomain from '../domains/general/interpreter'
import interpretStringDomain from '../domains/string/interpreter'
import interpretRegexDomain from '../domains/regex/interpreter'

// TODO: Check how to best use type here
export function interpretModifier(modifier: IModifier, varname: string) {
  switch (modifier.domain) {
    case 'number': return interpretNumberDomain(modifier, varname)
    case 'path': return interpretPathDomain(modifier, varname)
    case 'word': return interpretWordDomain(modifier, varname)
    case 'general': return interpretGeneralDomain(modifier, varname)
    case 'string': return interpretStringDomain(modifier, varname)
    case 'regex': return interpretRegexDomain(modifier, varname)
    default:
      throw Error('Unknown interpret domain: ' + modifier.domain)
  }
}

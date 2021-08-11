import { ModifierDomain } from '../domain'
import { basename, parse, win32 } from 'path'

export class PathModifierDomain extends ModifierDomain {

  constructor() {
    super()
    this.domain = {
      base: /[:\\/a-zA-ZæøåÆØÅ0-9\-_\.]+/,
      pattern: /path/,
      modifier: (value) => value,
    }
    this.tools = [
      {
        pattern: /basename/,
        modifier: (value: string) => (process.platform === 'win32' ? win32.basename : basename)(value)
      },
      {
        pattern: /dir/,
        modifier: (value: string) => (process.platform === 'win32' ? win32.parse : parse)(value).dir
      },
    ]
    this.build()
  }
}


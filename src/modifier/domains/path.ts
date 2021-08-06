import { ModifierDomain } from '../domain'
import { basename, parse } from 'path'

export class PathModifierDomain extends ModifierDomain {

  constructor() {
    super()
    this.domain = {
      base: /[:/a-zA-ZæøåÆØÅ0-9\-_]+/,
      pattern: /path/,
      modifier: (value) => value,
    }
    this.tools = [
      {
        pattern: /basename/,
        modifier: (value: string) => basename(value)
      },
      {
        pattern: /dir/,
        modifier: (value: string) => parse(value).dir
      },
    ]
    this.build()
  }
}


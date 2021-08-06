import { ModifierDomain } from '../domain'

export class NumberModifierDomain extends ModifierDomain {

  constructor() {
    super()
    this.domain = {
      base: '[0-9]+',
      pattern: /number/,
      modifier: (value) => value,
    }

    this.tools = [
      {
        pattern: /toInteger/,
        modifier: (value: string) => parseInt(value, 10)
      },
      {
        pattern: /inc(\s*(?<amount>[1-9][0-9]*))?/,
        modifier: (value: number, { amount }: any) => value + parseInt(amount || '1', 10)
      },
      {
        pattern: /dec(?<amount>\s*[1-9][0-9]*)/,
        modifier: (value: number, { amount }: any) => value - parseInt(amount || '1', 10)
      },
    ]

    this.build()
  }
}

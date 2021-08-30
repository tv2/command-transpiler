import { IInterpret, IStore } from './types'
import { parse, compilePattern } from './parser'
import { interpret } from './interpreter'

export class Pattern {
  readonly raw: string
  protected pattern: RegExp
  protected interpret: IInterpret

  constructor(raw: string, caseSensitive: boolean = true) {
    this.raw = raw
    const pattern = parse(raw)
    if (pattern.success === false) {
      throw new Error('Pattern parsing failed with context: ' + JSON.stringify(pattern))
    }
    const compiledPattern = compilePattern(pattern.value, caseSensitive ? '' : 'i')
    this.pattern = compiledPattern.pattern
    this.interpret = interpret(compiledPattern.processors)
  }

  public match(text: string): IStore | null {
    const textMatch = text.match(this.pattern)
    if (textMatch === null) return null
    return this.interpret({ ...textMatch.groups })
  }
}

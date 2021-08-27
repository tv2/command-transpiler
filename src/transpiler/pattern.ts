import { IStore } from '../interpreter/types'
import { pattern as patternParser } from '../parser'
import { pattern as patternInterpreter } from '../interpreter'

export class Pattern {
  readonly raw: string
  protected pattern: RegExp
  protected interpret: patternInterpreter.IPatternInterpret

  constructor(raw: string) {
    this.raw = raw
    const pattern = patternParser.parse(this.raw)
    if (pattern.success === false) {
      throw new Error('Pattern parsing failed with context: ' + JSON.stringify(pattern))
    }
    const compiledPattern = patternParser.compilePattern(pattern.value)
    this.pattern = compiledPattern.pattern
    this.interpret = patternInterpreter.interpret(compiledPattern.modifiables)
  }

  public match(text: string): IStore | null {
    const textMatch = text.match(this.pattern)
    if (textMatch === null) return null
    return this.interpret({ ...textMatch.groups })
  }
}

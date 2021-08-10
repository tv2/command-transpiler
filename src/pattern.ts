import { Modifiable } from './modifiable'

/**
 * @desc   A pattern for matching and extracting modifiable parts.
 */
export class Pattern extends Modifiable {

  private pattern: RegExp | null
  private caseSensitive: boolean

  constructor(raw: string, caseSensitive: boolean = true) {
    super(raw)
    this.raw = `^${this.raw}$`
    this.pattern = null
    this.caseSensitive = caseSensitive
  }

  /**
   * @desc   Tries to match the pattern on an input.
   *         If succesful, returns extracted parts.
   */
  match(input: string): object | null {
    // Compile pattern
    if (this.pattern === null) {
      this.pattern = new RegExp(this.raw, this.caseSensitive ? '' : 'i')
    }

    // Match
    const match = input.match(this.pattern)
    if (match === null) return null

    // Run modifiers
    return Object.fromEntries(
      Object.entries({ ...match.groups }).map(([key, value]) => [key,
        this.modifiers[key].modifiers.reduce((newValue,{ modifier, args }) => modifier(newValue, args), value)
      ])
    )
  }
}


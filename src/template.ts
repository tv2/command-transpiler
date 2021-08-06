import { Modifiable } from './modifiable'

/**
 * @desc   Template for filling in extracted data from Pattern.
 */
export class Template extends Modifiable {

  constructor(raw: string) {
   super(raw, false)
  }

  /**
   * @desc   Fills in extracted data into the template
   */
  fill(result: any): string {
    let raw = this.raw
    Object.entries(this.modifiers).forEach(([id, { name, modifiers }]) => {
      if (!(name in result)) {
        throw new Error(`The variable ${name} is undefined.`)
      }
      const value = modifiers.reduce((newValue, { modifier, args }) => modifier(newValue, args), result[name])
      raw = raw.replace(`@{${id}}`, value)
    })
    return raw
  }
}



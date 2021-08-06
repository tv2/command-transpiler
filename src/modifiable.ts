import { IModifierContext } from './modifier'

/**
 * @desc   Represents a unit that has modifable parts.
 */
export class Modifiable {

  protected _raw: string
  protected raw: string
  protected modifiers: { [key: string]: {
    name: string,
    modifiers: IModifierContext[],
  } }

  toString = (modified: boolean = false) => modified ? this.raw : this._raw

  constructor(raw: string, escape: boolean = true) {
    this.raw = escape ? this.escape(raw) : raw
    this._raw = raw
    this.modifiers = {}
  }

  /**
   * @desc   Escaping input for regex usage except for modifiable parts.
   */
  protected escape(raw: string) {
    const curly = /((?<!#)\{)|((?<!#\{[^}]+)\})/
    const rest  = /((?<!#\{[^}]+)[.*+()?|[\]^$\\])/
    const regex = new RegExp(`${curly.source}|${rest.source}`, 'g')
    return raw.replace(regex, '\\$&')
  }

  /**
   * @desc   Register a modifier to a modifiable part.
   * @param  id: The reference to the modifiable part.
   * @param  name: The name that the modifiable part should be bound to.
   */
  modify(id: string, name: string, modifierContext: IModifierContext) {
    if (!(id in this.modifiers)) {
      this.modifiers[id] = { name, modifiers: [] }
    }
    this.modifiers[id].modifiers.push(modifierContext)
  }

  /**
   * @desc   Modifies content to reflect registered modifiers.
   * @param  pattern: The modifiable part pattern.
   * @param  handle: Callback for registering the modifier in content.
   */
  update(pattern: RegExp, handle: (result: any) => string) {
    this.raw = this.raw.replace(new RegExp(pattern.source, 'g'), (...data) => handle(data[data.length-1] || {}))
  }

}

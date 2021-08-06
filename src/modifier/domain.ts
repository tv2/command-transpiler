import { IModifier, IModifierContext } from './modifier'
import { Modifiable } from '../modifiable'
import { Pattern } from '../pattern'

/**
 * @desc   A domain of modifiers. Have an optional base modifier that 
 *         parses input and tool modifiers that modifies the parsed input.
 */
export class ModifierDomain {

  protected domain?: {
    base: string | RegExp | ((domain: string) => string | RegExp),
    pattern: string | RegExp,
    modifier: IModifier,
  }

  public tools: {
    pattern: RegExp | string,
    modifier: IModifier,
  }[] = []

  protected pattern: RegExp = /\\0never\\0/g
  protected template: RegExp = /\\0never\\0/g

  build() {
    this.pattern = this.buildPattern()
    this.template = this.buildTemplate()
  }

  buildPattern() {
    const domain = this.domain ? this.regex(this.domain.pattern) : this.regex('\0never\0')
    const name   = /(:\s*(?<_name_>[a-zA-Z][a-zA-Z0-9\-_]*)\s*)?/
    const tools  = /(\|\s*(?<_tools_>[^}]+))?/
    return new RegExp(`#{\\s*(?<_domain_>${domain.source})\\s*${name.source}${tools.source}}`, 'g')
  }

  buildTemplate() {
    const name   = /((?<_name_>[a-zA-Z][a-zA-Z0-9\-_]*)\s*)?/
    const tools  = /(\|\s*(?<_tools_>(\\\}|[^}])+))?/
    return new RegExp(`#{\\s*${name.source}${tools.source}}`, 'g')
  }

  private regex = (raw: string | RegExp): RegExp => raw instanceof RegExp ? raw : new RegExp(raw)

  /**
   * @desc   Replaces modifiers that uses this domain and registers modifiers.
   */
  inject(modifiable: Modifiable) {
    const pattern = modifiable instanceof Pattern ? this.pattern : this.template
    const handler = modifiable instanceof Pattern ? this.injectPattern.bind(this) : this.injectTemplate.bind(this)
    modifiable.update(pattern, (result) => handler(modifiable, result))
  }

  protected injectPattern(modifiable: Modifiable, { _domain_, _name_, _tools_ }: { [key: string]: string }): string {
    const base = this.getBase(_domain_)
    if (!_name_) return base
    modifiable.modify(_name_, _name_, { modifier: (this.domain as any).modifier, args: {} })
    this.getTools(_tools_).forEach(tool => modifiable.modify(_name_, _name_, tool))
    return `(?<${_name_}>${base})`
  }

  protected getBase(_domain_: string): string {
    return this.domain ? this.regex(this.domain.base instanceof Function ? this.domain.base(_domain_) : this.domain.base).source : ''
  }

  protected injectTemplate(modifiable: Modifiable, { _name_, _tools_ }: { [key: string]: string }): string {
    const id = `${_name_}${_tools_ ? `|${_tools_}` : ''}${Math.random()}`.replace(/\s+/, '')
    modifiable.modify(id, _name_, { modifier: (value) => value, args: {} })
    this.getTools(_tools_).forEach(tool => modifiable.modify(id, _name_, tool))
    return `@{${id}}`
  }

  protected getTools(tools: string): IModifierContext[] {
    return (tools || '')
      .replace(/\\{/, '{')
      .replace(/\\}/, '}')
      .split(/\s*\|\s*/)
      .map(tool => tool.trim())
      .filter(tool => tool)
      .map(tool => {
        for (const { pattern, modifier } of this.tools) {
          const match: any = tool.match(pattern)
          if (match !== null) {
            return { modifier, args: match.groups || {} }
          }
        }
        throw Error(`Unknown modifier tool: ${tool}.`)
      })
  }
}

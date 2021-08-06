import { ModifierDomain } from '../domain'

export class GeneralModifierDomain extends ModifierDomain {

  constructor() {
    super()
    this.tools = [
      {
        pattern: /^length$/,
        modifier: (value: any) => 'length' in Object(value) ? value.length  : -1
      },
      {
        pattern: /^toString$/,
        modifier: (value: any) => 'toString' in Object(value) ? value.toString() : `${value}`
      },
      {
        pattern: /^replace\s+\/(?<source>([^\/]|\\\/)+)\/(?<target>([^\/]|\\\/)*)\/$/,
        modifier: (value: any, { source, target }: any) => value.replace(new RegExp(source, 'g'), target)
      },
      {
        pattern: /^map_replace\s+\/(?<source>([^\/]|\\\/)+)\/(?<target>([^\/]|\\\/)*)\/$/,
        modifier: (values: any[], { source, target }: any) => values.map(value => value.replace(new RegExp(source, 'g'), target))
      },
      {
        pattern: /^map_wrap\s+"(?<begin>([^"]|\\")+)"\s+"(?<end>([^"]|\\")+)"$/,
        modifier: (values: any[], { begin, end }: any) => {
          const _begin = begin.replace(/\\"/, '"')
          const _end =   end.replace(/\\"/, '"')
          return values.map(value => `${_begin}${value}${_end}`)
        }
      },
      {
        pattern: /^split\s+"(?<delimiter>([^"]|\\")+)"$/,
        modifier: (value: any, { delimiter }: any) => value.split(delimiter)
      },
      {
        pattern: /^join\s+"(?<delimiter>([^"]|\\")+)"$/,
        modifier: (value: any, { delimiter }: any) => value.join(delimiter)
      },
    ]
    this.build()
  }
}

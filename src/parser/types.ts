export enum ILeafKind {
  PlainText = 'plaintext',
  Modifiable = 'modifiable',
}

export type ILeaf = IPlainText | IModifiable

export type IPlainText = Readonly<{
  type: ILeafKind.PlainText
  text: string
}>

export type IInterpret = (context: IInterpretContext) => any

export type IInterpretContext = Readonly<{
  value: any
  varname: string
  store: any
  args?: any
}>
export type IModifier = IModifierBase
export type IModifierBase = Readonly<{
  domain: string
  pattern: string
  args?: { [key: string]: any }
  interpret: IInterpret
}>
export type IModifierTool = Readonly<{
  domain: string
  interpret: IInterpret
}>

export type IModifiable = Readonly<{
  type: ILeafKind.Modifiable
  base?: IModifierBase
  varname: string | null
  modifiers: any[]
  args?: { [key: string]: any }
}>

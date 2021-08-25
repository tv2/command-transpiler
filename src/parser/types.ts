export type ILeaf = IPlainText | IModifiable

export type IPlainText = Readonly<{
  type: 'plaintext'
  text: string
}>

export type IModifiable = Readonly<{
  type: 'modifiable'
  base: string
  varname: string | null
  modifiers: any[]
}>

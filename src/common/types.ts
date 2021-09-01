export type IModifiers = IModifier[]
export type IBaseModifier = IModifier & { pattern: string }
export type IModifier = Readonly<{
  domain: string
  modifier: string
  args?: IArgs
}>

export type IArgs = { [key: string]: any }
export type IStore = { [key: string]: any }

export type IInterpret = (store: IStore) => IStore

export type IInterpreterContext = Readonly<{
  varname: string
  args?: IStore
}>

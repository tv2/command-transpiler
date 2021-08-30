export * from '../common/types'
import { IModifiers } from '../common/types'

export type IAST = ILeaf[]

export type ILeaf = IStaticLeaf | IModifiableLeaf

export enum LeafKind {
  Static = 'static',
  Modifiable = 'modifiable',
}

export type IStaticLeaf = Readonly<{
  type: LeafKind.Static
  text: string
}>

export type IModifiableLeafs = IModifiableLeaf[]
export type IModifiableLeaf = Readonly<{
  type: LeafKind.Modifiable
  varname: string
  modifiers: IModifiers
}>

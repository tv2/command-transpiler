import { ILeaf, ILeafKind, IModifiable, IModifier } from '../parser/types'
import { IStore } from './types'

function interpretModifier(modifier: IModifier, varname: string, store: IStore): IStore {
  const newValue = modifier.interpret({ args: modifier.args, value: store[varname], store, varname })
  return { ...store, [varname]: newValue }
}

function interpretModifiable(modifiable: IModifiable, store: IStore): IStore {
  if (!modifiable.varname) return store
  const varname = modifiable.varname
  const baseModifiedStore = interpretModifier(modifiable.base as IModifier, varname, store)
  const modifiedStore = modifiable.modifiers.reduce(
    (store, modifier) => interpretModifier(modifier, varname, store),
    baseModifiedStore
  )
  return modifiedStore
}
export type IPatternInterpret = (store: IStore) => IStore

export function interpret(ast: ILeaf[]): IPatternInterpret {
  const modifiables = ast.filter((leaf) => leaf.type === ILeafKind.Modifiable) as IModifiable[]
  return (store) => {
    const modifiedStore = modifiables.reduce((store, modifiable) => interpretModifiable(modifiable, store), store)
    return modifiedStore
  }
}

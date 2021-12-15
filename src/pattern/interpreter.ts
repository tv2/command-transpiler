import { IInterpret, IModifiableLeaf, IModifiableLeafs } from './types'
import { interpretModifier } from '../common/interpreter'

function interpretModifiable({ base, varname, modifiers }: IModifiableLeaf): IInterpret {
  const baseModifier = interpretModifier(base, varname!)
  const toolModifiers = modifiers.map((modifier) => interpretModifier(modifier, varname!))
  return (store) => {
    const newStore = toolModifiers.reduce((store, modifier) => modifier(store), baseModifier(store))
    delete newStore[null!]
    return newStore
  }
}

export function interpret(modifiables: IModifiableLeafs): IInterpret {
  const preparedModifiables = modifiables.map((modifiable) => interpretModifiable(modifiable))
  return (store) => preparedModifiables.reduce((store, modifiable) => modifiable(store), store)
}

import { IModifiableLeaf, IAST, ILeaf, LeafKind, IStaticLeaf, IStore, IResult } from './types'
import { interpretModifier } from '../common/interpreter'

function interpretModifiableLeaf(leaf: IModifiableLeaf): (store: IStore) => IResult {
  const modifiers = leaf.modifiers.map((modifier) => interpretModifier(modifier, leaf.varname))
  return (store) => {
    const hasVarname = leaf.varname in store && store[leaf.varname] !== undefined
    const newStore = modifiers.reduce((store, modifier) => modifier(store), store)
    const value = newStore[leaf.varname]
    if (!hasVarname && (value === undefined || value === NaN || value.toString().includes('undefined'))) {
      throw Error(`Variable ${leaf.varname} is undefined.`)
    }
    return {
      result: value,
      store: newStore,
    }
  }
}

function interpretStaticLeaf(leaf: IStaticLeaf): (store: IStore) => IResult {
  return (store) => ({ result: leaf.text, store })
}

function interpretLeaf(leaf: ILeaf): (store: IStore) => IResult {
  switch (leaf.type) {
    case LeafKind.Static:
      return interpretStaticLeaf(leaf)
    case LeafKind.Modifiable:
      return interpretModifiableLeaf(leaf)
  }
}

export function interpret(ast: IAST): (store: IStore) => IResult {
  const preparedAst = ast.map((leaf) => interpretLeaf(leaf))
  return (store) => {
    const resultAndStore = preparedAst.reduce(
      ({ result, store }, interpret) => {
        const resultAndStore = interpret(store)
        return {
          result: result + resultAndStore.result,
          store: {
            ...store,
            '@keep': resultAndStore.store['@keep'],
          },
        }
      },
      {
        result: '',
        store,
      }
    )
    return { ...resultAndStore, store: resultAndStore.store['@keep'] ?? {} }
  }
}

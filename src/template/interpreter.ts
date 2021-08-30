import { IModifiableLeaf, IAST, ILeaf, LeafKind, IStaticLeaf, IStore } from './types'
import { interpretModifier } from '../common/interpreter'

function interpretModifiableLeaf(leaf: IModifiableLeaf): (store: IStore) => string {
  const modifiers = leaf.modifiers.map(modifier => interpretModifier(modifier, leaf.varname))
  return store => {
    const hasVarname = leaf.varname in store
    const value = modifiers.reduce((store,modifier) => modifier(store), store)[leaf.varname]
    if (!hasVarname && (value === undefined || value === NaN || value.toString().includes('undefined'))) {
      throw Error(`Variable ${leaf.varname} is undefined.`)
    }
    return value
  }
}

function interpretStaticLeaf(leaf: IStaticLeaf): (store: IStore) => string {
  return _ => leaf.text
}

function interpretLeaf(leaf: ILeaf): (store: IStore) => string {
  switch (leaf.type) {
    case LeafKind.Static: return interpretStaticLeaf(leaf)
    case LeafKind.Modifiable: return interpretModifiableLeaf(leaf)
  }
}

export function interpret(ast: IAST): (store: IStore) => string {
  const preparedAst = ast.map(leaf => interpretLeaf(leaf))
  return store => preparedAst.map(interpret => interpret(store)).join('')
}

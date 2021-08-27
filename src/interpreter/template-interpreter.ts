import { ILeaf, ILeafKind, IModifiable, IModifier, IPlainText } from '../parser/types'
import { IStore } from './types'

function interpretModifier(modifier: IModifier, value: any, varname: string, store: IStore): any {
  return modifier.interpret({ args: modifier.args, value, store, varname })
}

function interpretModifiable(modifiable: IModifiable, store: IStore): string {
  if (!modifiable.varname) return ''
  const varname = modifiable.varname
  const value = modifiable.modifiers.reduce(
    (value, modifier) => interpretModifier(modifier, value, varname, store),
    store[varname]
  )
  return `${value}`
}

function interpretPlainText({ text }: IPlainText): string {
  return text
}

function interpretLeaf(leaf: ILeaf, store: IStore): string {
  switch (leaf.type) {
    case ILeafKind.Modifiable:
      return interpretModifiable(leaf, store)
    case ILeafKind.PlainText:
      return interpretPlainText(leaf)
  }
}

export type ITemplateInterpret = (store: IStore) => string
export function interpret(ast: ILeaf[]): ITemplateInterpret {
  return (store) => {
    return ast.map((leaf) => interpretLeaf(leaf, store)).join('')
  }
}

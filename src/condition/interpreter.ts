import { IModifiableLeaf, IStore } from './types'
import { interpretModifier } from '../common/interpreter'

export type IInterpret = (store: IStore) => boolean

function interpretOperatorOr({ left, right }: any): IInterpret {
  const leftValue = interpretExpr(left)
  const rightValue = interpretExpr(right)
  return store => !leftValue(store) ? Boolean(rightValue(store)) : true
}

function interpretOperatorAnd({ left, right }: any): IInterpret {
  const leftValue = interpretExpr(left)
  const rightValue = interpretExpr(right)
  return store => !!leftValue(store) ? Boolean(rightValue(store)) : false
}

function interpretOperator(expr: any): IInterpret {
  switch (expr.operator) {
    case 'and':
      return interpretOperatorAnd(expr)
    case 'or':
      return interpretOperatorOr(expr)
    default:
      throw Error('Unknown operator ' + expr.operator)
  }
}

function interpretLeafVariable({ modifiers, varname }: IModifiableLeaf): (store: IStore) => any {
  const preparedModifiers = modifiers.map((modifier) => interpretModifier(modifier, varname))
  return (store) => preparedModifiers.reduce((store, modifier) => modifier(store), store)[varname]
}

function interpretLeafNumber({ modifiers, value }: IModifiableLeaf & { value: number }): (store: IStore) => number {
  const varname = ' tmp ' // Is invalid  variable name
  const preparedModifiers = modifiers.map((modifier) => interpretModifier(modifier, varname))
  const args: IStore = { [varname]: value }
  return (store) => preparedModifiers.reduce((store, modifier) => modifier(store), { ...store, ...args })[varname]
}

function interpretLeaf(leaf: any): (store: IStore) => any {
  switch (leaf.leaftype) {
    case 'variable':
      return interpretLeafVariable(leaf)
    case 'number':
      return interpretLeafNumber(leaf)
    default:
      throw Error('Unknown leaf type ' + leaf.leaftype)
  }
}

function interpretExpr(expr: any): IInterpret {
  switch (expr.type) {
    case 'operator':
      return interpretOperator(expr)
    case 'leaf':
      return interpretLeaf(expr)
    default:
      console.log(expr)
      throw Error('Unknown expr type ' + expr.type)
  }
}

export function interpret(ast: any): IInterpret {
  return interpretExpr(ast)
}

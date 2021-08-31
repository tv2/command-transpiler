import {
  string,
  ws,
  lpipe,
  pipe,
  any,
  regex,
  map,
  sequence,
  eof,
} from '../utilities/parser-combinator/combinators'
import { IResult, IParser } from '../utilities/parser-combinator'

import { parseParens, parseModifiers, parseVarname } from '../common/parser'
import { IModifiers } from '../common/types'

type ILeafVariable = { type: 'leaf', leaftype: 'variable', varname: string, modifiers: IModifiers }
type ILeafNumber = { type: 'leaf', leaftype: 'number', value: number, modifiers: IModifiers }
type ILeaf = ILeafVariable | ILeafNumber
type IOperator = { type: 'operator', operator: string, left: IExpr, right: IExpr }

type IExpr = ILeaf | IOperator

function parseVariable(): IParser<IExpr> {
  return map(
    sequence<any>(parseVarname(), pipe(ws, parseModifiers())),
    ([varname, modifiers]) => ({ type: 'leaf', leaftype: 'variable', varname, modifiers })
  )
}

function parseNumber(): IParser<IExpr> {
  return map(
    sequence<any>(regex(/[0-9]+/i), pipe(ws, parseModifiers())),
    ([value, modifiers]) => ({ type: 'leaf', leaftype: 'number', value: parseInt(value, 10), modifiers })
  )
}

function parseValue(): IParser<IExpr> {
  return any(parseVariable(), parseNumber())
}

function parseLogicOperators1(): IParser<IExpr> {
  return any(
    map(sequence<any>(lpipe(parseLeaf(), ws), lpipe(string('or'), ws), parseExpr()), ([left, op, right]: any) => ({
      type: 'operator',
      operator: op,
      left,
      right,
    })),
    parseLeaf()
  )
}

function parseLogicOperators(): IParser<IExpr> {
  return any(
    map(sequence<any>(lpipe(parseLeaf(), ws), lpipe(string('and'), ws), parseExpr()), ([left, op, right]: any) => ({
      type: 'operator',
      operator: op,
      left,
      right,
    })),
    parseLogicOperators1()
  )
}

function parseLeaf(): IParser<IExpr> {
  return any(parseParens(parseExpr()), parseValue())
}

function parseExpr(): IParser<IExpr> {
  return (context) => any(parseLogicOperators(), parseLeaf())(context)
}

const parser = lpipe(parseExpr(), eof)

export function parse(text: string, index: number = 0): IResult<IExpr> {
  return parser({ text, index })
}

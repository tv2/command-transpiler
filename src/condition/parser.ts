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

type Expr = any

function parseVariable(): IParser<Expr> {
  return map(
    sequence<any>(parseVarname(), pipe(ws, parseModifiers())),
    ([varname, modifiers]) => ({ type: 'leaf', leaftype: 'variable', varname, modifiers })
  )
}

function parseNumber(): IParser<Expr> {
  return map(
    sequence<any>(regex(/[0-9]+/i), pipe(ws, parseModifiers())),
    ([value, modifiers]) => ({ type: 'leaf', leaftype: 'number', value: parseInt(value, 10), modifiers })
  )
}

function parseValue(): IParser<Expr> {
  return any(parseVariable(), parseNumber())
}

function parseLogicOperators1(): IParser<Expr> {
  return any(
    map(sequence(lpipe(parseLeaf(), ws), lpipe(string('or'), ws), parseExpr()), ([left, op, right]: any) => ({
      type: 'operator',
      operator: op,
      left,
      right,
    })),
    parseLeaf()
  )
}

function parseLogicOperators(): IParser<Expr> {
  return any(
    map(sequence(lpipe(parseLeaf(), ws), lpipe(string('and'), ws), parseExpr()), ([left, op, right]: any) => ({
      type: 'operator',
      operator: op,
      left,
      right,
    })),
    parseLogicOperators1()
  )
}

function parseLeaf(): IParser<Expr> {
  return any(parseParens(parseExpr()), parseValue())
}

function parseExpr(): IParser<Expr> {
  return (context) => any(parseLogicOperators(), parseLeaf())(context)
}

const parser = lpipe(parseExpr(), eof)

export function parse(text: string, index: number = 0): IResult<Expr> {
  return parser({ text, index })
}

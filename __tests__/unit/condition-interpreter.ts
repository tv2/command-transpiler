const { interpret } = require('../../src/condition/interpreter')

test('Unknown operator', () => {
  const defaultLeaf = { type: 'leaf', leaftype: 'number', value: 5, modifiers: [] }
  expect(() => interpret({ type: 'operator', operator: '__unknown_operator__', left: null, right: null }, 'some-var')).toThrow()
  expect(() => interpret({ type: 'operator', operator: '__unknown_operator__', left: defaultLeaf, right: defaultLeaf }, 'some-var')).toThrow()
})

test('Unknown leaf type', () => {
  expect(() => interpret({ type: 'leaf', leaftype: '__unknown_leaf_type__', value: 5, modifiers: [] }, 'some-var')).toThrow()
})

test('Unknown expression type', () => {
  expect(() => interpret({ type: '__unknown_expression_type__', leaftype: '__unknown_leaf_type__', value: 5, modifiers: [] }, 'some-var')).toThrow()
})

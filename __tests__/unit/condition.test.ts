const { Condition } = require('../../src/condition')

test('incorrect pattern', () => {
  expect(() => new Condition('#{')).toThrow()
})

test('empty', () => {
  const condition = new Condition('')
  expect(condition.check({})).toBeTruthy()
  expect(condition.check({ variable: true })).toBeTruthy()
  expect(condition.check({ variable: false })).toBeTruthy()
})

test('no modifier 1', () => {
  const condition = new Condition('1')
  expect(condition.check({})).toBeTruthy()
  expect(condition.check({ variable: true })).toBeTruthy()
  expect(condition.check({ variable: false })).toBeTruthy()
})

test('no modifier 0', () => {
  const condition = new Condition('0')
  expect(condition.check({})).toBeFalsy()
  expect(condition.check({ variable: true })).toBeFalsy()
  expect(condition.check({ variable: false })).toBeFalsy()
})

test('no modifier variable', () => {
  const condition = new Condition('result')
  expect(condition.check({})).toBeFalsy()
  expect(condition.check({ result: true })).toBeTruthy()
  expect(condition.check({ result: 1 })).toBeTruthy()
  expect(condition.check({ result: false })).toBeFalsy()
  expect(condition.check({ result: 0 })).toBeFalsy()
})

test('and operator', () => {
  const condition = new Condition('var1 and var2')
  expect(condition.check({})).toBeFalsy()
  expect(condition.check({ var1: true, var2: true })).toBeTruthy()
  expect(condition.check({ var1: false, var2: true })).toBeFalsy()
  expect(condition.check({ var1: true, var2: false })).toBeFalsy()
  expect(condition.check({ var1: false, var2: false })).toBeFalsy()
})

test('or operator', () => {
  const condition = new Condition('var1 or var2')
  expect(condition.check({})).toBeFalsy()
  expect(condition.check({ var1: true, var2: true })).toBeTruthy()
  expect(condition.check({ var1: false, var2: true })).toBeTruthy()
  expect(condition.check({ var1: true, var2: false })).toBeTruthy()
  expect(condition.check({ var1: false, var2: false })).toBeFalsy()
})

export {}
const { Condition } = require('../../src/condition')

test('length', () => {
  const condition = new Condition('text | length')
  expect(condition.check({ text: '' })).toEqual(0)
  expect(condition.check({ text: 'hello' })).toEqual(5)
  expect(condition.check({ text: 5 })).toEqual(0)
})

test('toString', () => {
  const condition = new Condition('text | toString')
  expect(condition.check({ text: '' })).toEqual('')
  expect(condition.check({ text: 'hello' })).toEqual('hello')
  expect(condition.check({ text: 5 })).toEqual('5')
})

test('equal', () => {
  const condition = new Condition('text | equal "hello"')
  expect(condition.check({ text: '' })).toBeFalsy()
  expect(condition.check({ text: 0 })).toBeFalsy()
  expect(condition.check({ text: null })).toBeFalsy()
  expect(condition.check({ text: 'hello' })).toBeTruthy()
  expect(condition.check({ text: 'shello' })).toBeFalsy()
  expect(condition.check({ text: 'hellos' })).toBeFalsy()
  expect(condition.check({ text: 'shellos' })).toBeFalsy()
  expect(condition.check({ text: 5 })).toBeFalsy()
})

test('not', () => {
  const condition = new Condition('text | not ')
  expect(condition.check({ text: '' })).toBeTruthy()
  expect(condition.check({ text: 0 })).toBeTruthy()
  expect(condition.check({ text: null })).toBeTruthy()
  expect(condition.check({ text: 'hello' })).toBeFalsy()
  expect(condition.check({ text: 'shello' })).toBeFalsy()
  expect(condition.check({ text: 'hellos' })).toBeFalsy()
  expect(condition.check({ text: 'shellos' })).toBeFalsy()
  expect(condition.check({ text: 5 })).toBeFalsy()
})

test('not equal', () => {
  const condition = new Condition('text | equal "hello" | not ')
  expect(condition.check({ text: '' })).toBeTruthy()
  expect(condition.check({ text: 0 })).toBeTruthy()
  expect(condition.check({ text: null })).toBeTruthy()
  expect(condition.check({ text: 'hello' })).toBeFalsy()
  expect(condition.check({ text: 'shello' })).toBeTruthy()
  expect(condition.check({ text: 'hellos' })).toBeTruthy()
  expect(condition.check({ text: 'shellos' })).toBeTruthy()
  expect(condition.check({ text: 5 })).toBeTruthy()
})

test('not not', () => {
  const condition = new Condition('text | not | not ')
  expect(condition.check({ text: '' })).toBeFalsy()
  expect(condition.check({ text: 0 })).toBeFalsy()
  expect(condition.check({ text: null })).toBeFalsy()
  expect(condition.check({ text: 'hello' })).toBeTruthy()
  expect(condition.check({ text: 'shello' })).toBeTruthy()
  expect(condition.check({ text: 'hellos' })).toBeTruthy()
  expect(condition.check({ text: 'shellos' })).toBeTruthy()
  expect(condition.check({ text: 5 })).toBeTruthy()
})

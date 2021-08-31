const { Rule } = require('../../src/rule')

test('parsing a number', () => {
  const rule = new Rule('I have #{ number : dogs } dogs', '')

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: 0 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 5 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 12 })
})

test('parsing a negative number', () => {
  const rule = new Rule('I have #{ number : dogs } dogs', '')

  expect(rule.match('I have -0 dogs')).toEqual({ dogs: -0 })
  expect(rule.match('I have -5 dogs')).toEqual({ dogs: -5 })
  expect(rule.match('I have -12 dogs')).toEqual({ dogs: -12 })
})

test('parsing a number + 1', () => {
  const rule = new Rule('I have #{ number : dogs | inc 1 } dogs', '')

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: 1 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 6 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 13 })
})

test('parsing a number + 1 (without amount specified)', () => {
  const rule = new Rule('I have #{ number : dogs | inc } dogs', '')

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: 1 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 6 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 13 })
})

test('parsing a number + 69', () => {
  const rule = new Rule('I have #{ number : dogs | inc 69 } dogs', '')

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: 69 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 74 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 81 })
})

test('parsing a number - 1', () => {
  const rule = new Rule('I have #{ number : dogs | dec 1 } dogs', '')

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: -1 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 4 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 11 })
})

test('parsing a number - 1 (without amount specified)', () => {
  const rule = new Rule('I have #{ number : dogs | dec } dogs', '')

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: -1 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 4 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 11 })
})

test('parsing a number - 69', () => {
  const rule = new Rule('I have #{ number : dogs | dec 69 } dogs', '')

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: -69 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: -64 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: -57 })
})

test('parsing a number % 2', () => {
  const rule = new Rule('I have #{ number : dogs | mod 2 } dogs', '')

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: 0 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 1 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 0 })
})

test('parsing a absolute number', () => {
  const rule = new Rule('I have #{ number : dogs | abs } dogs', '')

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: 0 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 5 })
  expect(rule.match('I have -5 dogs')).toEqual({ dogs: 5 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 12 })
  expect(rule.match('I have -12 dogs')).toEqual({ dogs: 12 })
})

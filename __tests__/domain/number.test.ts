const { NumberModifierDomain } = require('../../src/modifier/domains')
const { Rule } = require('../../src')

const domain = new NumberModifierDomain()

test('parsing a number', () => {
  const rule = new Rule('I have #{ number : dogs } dogs', '')
  rule.injectWith(domain)

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: "0" })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: "5" })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: "12" })
})

test('parsing a number to Integer', () => {
  const rule = new Rule('I have #{ number : dogs | toInteger } dogs', '')
  rule.injectWith(domain)

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: 0 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 5 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 12 })
})

test('parsing a number + 1', () => {
  const rule = new Rule('I have #{ number : dogs | toInteger | inc 1 } dogs', '')
  rule.injectWith(domain)

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: 1 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 6 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 13 })
})
test('parsing a number + 69', () => {
  const rule = new Rule('I have #{ number : dogs | toInteger | inc 69 } dogs', '')
  rule.injectWith(domain)

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: 69 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 74 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 81 })
})

test('parsing a number - 1', () => {
  const rule = new Rule('I have #{ number : dogs | toInteger | dec 1 } dogs', '')
  rule.injectWith(domain)

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: -1 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: 4 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: 11 })
})

test('parsing a number - 69', () => {
  const rule = new Rule('I have #{ number : dogs | toInteger | dec 69 } dogs', '')
  rule.injectWith(domain)

  expect(rule.match('I have 0 dogs')).toEqual({ dogs: -69 })
  expect(rule.match('I have 5 dogs')).toEqual({ dogs: -64 })
  expect(rule.match('I have 12 dogs')).toEqual({ dogs: -57 })
})

const { Rule, Template, Pattern, Condition } = require('../../src')

test('constructor', () => {
  const rule1 = new Rule(new Pattern('1'), new Template('2'), new Condition('3'))
  const rule2 = new Rule('1', '2', '3')
  const rule3 = new Rule('1', '2', '4')
  const rule4 = new Rule('1', '2')
  expect(JSON.stringify(rule1)).toEqual(JSON.stringify(rule2))
  expect(JSON.stringify(rule1)).toEqual(JSON.stringify(rule2))
  expect(JSON.stringify(rule1)).not.toEqual(JSON.stringify(rule3))
  expect(JSON.stringify(rule1)).not.toEqual(JSON.stringify(rule4))
})

test('match', () => {
 const rule = new Rule('#{ number: num }', '#{ num }', 'num | equal 2')
 expect(rule.match('1')).toEqual({ num: 1 })
 expect(rule.match('2')).toEqual({ num: 2 })
 expect(rule.match('3')).toEqual({ num: 3 })
})

test('check', () => {
 const rule = new Rule('#{ number: num }', '#{ num }', 'num | equal 2')
 expect(rule.check({ num: 1 })).toEqual(false)
 expect(rule.check({ num: 2 })).toEqual(true)
 expect(rule.check({ num: 3 })).toEqual(false)
})

test('fill', () => {
 const rule = new Rule('#{ number: num }', '#{ num }', 'num | equal 2')
 expect(rule.fill({ num: 1 })).toEqual('1')
 expect(rule.fill({ num: 2 })).toEqual('2')
 expect(rule.fill({ num: 3 })).toEqual('3')
})

test('transpile', () => {
 const rule = new Rule('#{ number: num }', '#{ num }', 'num | equal 2')
 expect(rule.transpile('1')).toEqual(null)
 expect(rule.transpile('2')).toEqual('2')
 expect(rule.transpile('3')).toEqual(null)
})

test('no condition', () => {
 const rule = new Rule('#{ number: num }', '#{ num }')
 expect(rule.transpile('1')).toEqual('1')
 expect(rule.transpile('2')).toEqual('2')
 expect(rule.transpile('3')).toEqual('3')
})

test('empty condition', () => {
 const rule = new Rule('#{ number: num }', '#{ num }', '')
 expect(rule.transpile('1')).toEqual('1')
 expect(rule.transpile('2')).toEqual('2')
 expect(rule.transpile('3')).toEqual('3')
})

test('non-match', () => {
  const rule = new Rule('#{ number: num }', '#{ num }', '')
  expect(rule.transpile('hello world')).toEqual(null)
  expect(rule.transpile('A4')).toEqual(null)
  expect(rule.transpile('4H')).toEqual(null)
})

test('even', () => {
  const rule = new Rule('#{ number: num }', 'even', 'num | mod 2 | equal 0')
  expect(rule.transpile('1')).toEqual(null)
  expect(rule.transpile('2')).toEqual('even')
  expect(rule.transpile('3')).toEqual(null)
  expect(rule.transpile('4')).toEqual('even')
  expect(rule.transpile('5')).toEqual(null)
  expect(rule.transpile('6')).toEqual('even')
  expect(rule.transpile('7')).toEqual(null)
  expect(rule.transpile('8')).toEqual('even')
  expect(rule.transpile('9')).toEqual(null)
  expect(rule.transpile('10')).toEqual('even')
  expect(rule.transpile('11')).toEqual(null)
  expect(rule.transpile('12')).toEqual('even')
})

test('odd', () => {
  const rule = new Rule('#{ number: num }', 'odd', 'num | mod 2 | equal 1')
  expect(rule.transpile('1')).toEqual('odd')
  expect(rule.transpile('2')).toEqual(null)
  expect(rule.transpile('3')).toEqual('odd')
  expect(rule.transpile('4')).toEqual(null)
  expect(rule.transpile('5')).toEqual('odd')
  expect(rule.transpile('6')).toEqual(null)
  expect(rule.transpile('7')).toEqual('odd')
  expect(rule.transpile('8')).toEqual(null)
  expect(rule.transpile('9')).toEqual('odd')
  expect(rule.transpile('10')).toEqual(null)
  expect(rule.transpile('11')).toEqual('odd')
  expect(rule.transpile('12')).toEqual(null)
})

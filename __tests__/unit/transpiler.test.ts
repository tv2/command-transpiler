const { Transpiler } = require('../../src')
const { Rule } = require('../../src')


test('even or odd', () => {
  const transpiler = new Transpiler([
    new Rule('#{ number: num }', 'even', 'num | mod 2 | equal 0'),
    new Rule('#{ number: num }', 'odd', 'num | mod 2 | equal 1'),
  ])
  expect(transpiler.transpile('1')).toEqual({ result: 'odd', line: 1 })
  expect(transpiler.transpile('2')).toEqual({ result: 'even', line: 0 })
  expect(transpiler.transpile('3')).toEqual({ result: 'odd', line: 1 })
  expect(transpiler.transpile('4')).toEqual({ result: 'even', line: 0 })
  expect(transpiler.transpile('5')).toEqual({ result: 'odd', line: 1 })
  expect(transpiler.transpile('6')).toEqual({ result: 'even', line: 0 })
  expect(transpiler.transpile('7')).toEqual({ result: 'odd', line: 1 })
  expect(transpiler.transpile('8')).toEqual({ result: 'even', line: 0 })
  expect(transpiler.transpile('9')).toEqual({ result: 'odd', line: 1 })
  expect(transpiler.transpile('10')).toEqual({ result: 'even', line: 0 })
  expect(transpiler.transpile('11')).toEqual({ result: 'odd', line: 1 })
  expect(transpiler.transpile('12')).toEqual({ result: 'even', line: 0 })
})

test('no hits', () => {
  const transpiler = new Transpiler([
    new Rule('#{ number: num }', 'even', 'num | mod 2 | equal 0'),
    new Rule('#{ number: num }', 'odd', 'num | mod 2 | equal 1'),
  ])
  expect(transpiler.transpile('hello world')).toEqual(null)
  expect(transpiler.transpile('A4')).toEqual(null)
  expect(transpiler.transpile('4H')).toEqual(null)
})

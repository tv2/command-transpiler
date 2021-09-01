const { Transpiler } = require('../../src')
const { Rule } = require('../../src')


test('even or odd', () => {
  const transpiler = new Transpiler([
    new Rule('#{ number: num }', 'even', 'num | mod 2 | equal 0'),
    new Rule('#{ number: num }', 'odd', 'num | mod 2 | equal 1'),
  ])
  expect(transpiler.transpile('1')).toEqual('odd')
  expect(transpiler.transpile('2')).toEqual('even')
  expect(transpiler.transpile('3')).toEqual('odd')
  expect(transpiler.transpile('4')).toEqual('even')
  expect(transpiler.transpile('5')).toEqual('odd')
  expect(transpiler.transpile('6')).toEqual('even')
  expect(transpiler.transpile('7')).toEqual('odd')
  expect(transpiler.transpile('8')).toEqual('even')
  expect(transpiler.transpile('9')).toEqual('odd')
  expect(transpiler.transpile('10')).toEqual('even')
  expect(transpiler.transpile('11')).toEqual('odd')
  expect(transpiler.transpile('12')).toEqual('even')
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

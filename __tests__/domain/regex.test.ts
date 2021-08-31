const { Pattern } = require('../../src')

test('parsing a number', () => {
  const pattern = new Pattern('#{ regex /[0-9]+/ : regex }')

  expect(pattern.match('1234124')).toEqual({ regex: '1234124' })
  expect(pattern.match('0000')).toEqual({ regex: '0000' })
  expect(pattern.match('1')).toEqual({ regex: '1' })

  expect(pattern.match('some1')).toEqual(null)
  expect(pattern.match('one')).toEqual(null)
  expect(pattern.match('two')).toEqual(null)
  expect(pattern.match('')).toEqual(null)
})


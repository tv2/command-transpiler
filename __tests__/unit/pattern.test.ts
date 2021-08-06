const Pattern = require('../../src').Pattern

test('no modifier patterns', () => {
  const pattern = new Pattern('this is a pattern')
  expect(pattern.match('this is a pattern')).toEqual({})
  expect(pattern.match('this is not what we expect')).toEqual(null)
})

it('should not match on substrings', () => {
  const pattern = new Pattern('substring')
  expect(pattern.match('we do not want any substring nor substrings.')).toEqual(null)
  expect(pattern.match('we do not want a substring')).toEqual(null)
  expect(pattern.match('substring')).toEqual({})
})

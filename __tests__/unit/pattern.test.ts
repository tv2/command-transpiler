const { Pattern } = require('../../src')

test('incorrect pattern sensitive', () => {
  expect(() => new Pattern('#{', true)).toThrow()
})

test('incorrect pattern insensitive', () => {
  expect(() => new Pattern('#{', false)).toThrow()
})

test('empty pattern case sensitive', () => {
  const pattern = new Pattern('', true)
  expect(pattern.match('')).toEqual({})
  expect(pattern.match('h')).toEqual(null)
})

test('empty pattern case insensitive', () => {
  const pattern = new Pattern('', false)
  expect(pattern.match('')).toEqual({})
  expect(pattern.match('h')).toEqual(null)
})

test('no varname pattern', () => {
  const pattern = new Pattern('#{ number }')
  expect(pattern.match('5')).toEqual({})
  expect(pattern.match('69')).toEqual({})
  expect(pattern.match('A4')).toEqual(null)
})

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

it('should be case sensitive', () => {
  const pattern = new Pattern('somEstRIng', true)
  expect(pattern.match('somestring')).toEqual(null)
  expect(pattern.match('SOMESTRING')).toEqual(null)
  expect(pattern.match('SomestrinG')).toEqual(null)
  expect(pattern.match('SoMEstring')).toEqual(null)
  expect(pattern.match('somEstRIng')).toEqual({})
  expect(pattern.match('Somestrink')).toEqual(null)
})

it('should be case insensitive', () => {
  const pattern = new Pattern('somEstRIng', false)
  expect(pattern.match('somestring')).toEqual({})
  expect(pattern.match('SOMESTRING')).toEqual({})
  expect(pattern.match('SomestrinG')).toEqual({})
  expect(pattern.match('SoMEstring')).toEqual({})
  expect(pattern.match('somEstRIng')).toEqual({})
  expect(pattern.match('Somestrink')).toEqual(null)
})

const { Pattern } = require('../../src/pattern')

test('parsing a "word" case sensitive', () => {
  const pattern = new Pattern('#{ string "word" : string }', true)
  expect(pattern.match('word')).toEqual({ string: 'word' })
  expect(pattern.match('Word')).toEqual(null)
  expect(pattern.match('wOrd')).toEqual(null)
  expect(pattern.match('sword')).toEqual(null)
  expect(pattern.match('words')).toEqual(null)
  expect(pattern.match('swords')).toEqual(null)
})

test('parsing a "word" case insensitive', () => {
  const pattern = new Pattern('#{ string "word" : string }', false)
  expect(pattern.match('word')).toEqual({ string: 'word' })
  expect(pattern.match('Word')).toEqual({ string: 'Word' })
  expect(pattern.match('wOrd')).toEqual({ string: 'wOrd' })
  expect(pattern.match('sword')).toEqual(null)
  expect(pattern.match('words')).toEqual(null)
  expect(pattern.match('swords')).toEqual(null)
})

test('parsing a "#{"', () => {
  const pattern = new Pattern('#{ string "#{" : string }', false)
  expect(pattern.match('#{')).toEqual({ string: '#{' })
  expect(pattern.match(' #{ ')).toEqual(null)
})


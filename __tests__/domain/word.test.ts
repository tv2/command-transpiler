export {}
const { Pattern } = require('../../src')

test('parsing a word', () => {
  const pattern = new Pattern('#{ word: word }')

  expect(pattern.match('word')).toEqual({ word: 'word' })
  expect(pattern.match('some-word')).toEqual({ word: 'some-word' })
  expect(pattern.match('some_word')).toEqual({ word: 'some_word' })
  expect(pattern.match('some_word1')).toEqual({ word: 'some_word1' })
  expect(pattern.match('some_word-1')).toEqual({ word: 'some_word-1' })
  expect(pattern.match('some_word_1')).toEqual({ word: 'some_word_1' })
  expect(pattern.match('someWord')).toEqual({ word: 'someWord' })
  expect(pattern.match('someWord1')).toEqual({ word: 'someWord1' })
  expect(pattern.match('some words')).toEqual(null)
})

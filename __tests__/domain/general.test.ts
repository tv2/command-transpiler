export {}
const { Pattern, Condition, Template } = require('../../src')

test('length', () => {
  const condition = new Condition('text | length')
  expect(condition.check({ text: '' })).toEqual(0)
  expect(condition.check({ text: 'hello' })).toEqual(5)
  expect(condition.check({ text: 5 })).toEqual(0)
})

test('toString', () => {
  const condition = new Condition('text | toString')
  expect(condition.check({ text: '' })).toEqual('')
  expect(condition.check({ text: 'hello' })).toEqual('hello')
  expect(condition.check({ text: 5 })).toEqual('5')
})

test('equal', () => {
  const condition = new Condition('text | equal "hello"')
  expect(condition.check({ text: '' })).toBeFalsy()
  expect(condition.check({ text: 0 })).toBeFalsy()
  expect(condition.check({ text: null })).toBeFalsy()
  expect(condition.check({ text: 'hello' })).toBeTruthy()
  expect(condition.check({ text: 'shello' })).toBeFalsy()
  expect(condition.check({ text: 'hellos' })).toBeFalsy()
  expect(condition.check({ text: 'shellos' })).toBeFalsy()
  expect(condition.check({ text: 5 })).toBeFalsy()
})

test('not', () => {
  const condition = new Condition('text | not ')
  expect(condition.check({ text: '' })).toBeTruthy()
  expect(condition.check({ text: 0 })).toBeTruthy()
  expect(condition.check({ text: null })).toBeTruthy()
  expect(condition.check({ text: 'hello' })).toBeFalsy()
  expect(condition.check({ text: 'shello' })).toBeFalsy()
  expect(condition.check({ text: 'hellos' })).toBeFalsy()
  expect(condition.check({ text: 'shellos' })).toBeFalsy()
  expect(condition.check({ text: 5 })).toBeFalsy()
})

test('not equal', () => {
  const condition = new Condition('text | equal "hello" | not ')
  expect(condition.check({ text: '' })).toBeTruthy()
  expect(condition.check({ text: 0 })).toBeTruthy()
  expect(condition.check({ text: null })).toBeTruthy()
  expect(condition.check({ text: 'hello' })).toBeFalsy()
  expect(condition.check({ text: 'shello' })).toBeTruthy()
  expect(condition.check({ text: 'hellos' })).toBeTruthy()
  expect(condition.check({ text: 'shellos' })).toBeTruthy()
  expect(condition.check({ text: 5 })).toBeTruthy()
})

test('not not', () => {
  const condition = new Condition('text | not | not ')
  expect(condition.check({ text: '' })).toBeFalsy()
  expect(condition.check({ text: 0 })).toBeFalsy()
  expect(condition.check({ text: null })).toBeFalsy()
  expect(condition.check({ text: 'hello' })).toBeTruthy()
  expect(condition.check({ text: 'shello' })).toBeTruthy()
  expect(condition.check({ text: 'hellos' })).toBeTruthy()
  expect(condition.check({ text: 'shellos' })).toBeTruthy()
  expect(condition.check({ text: 5 })).toBeTruthy()
})

test('default 5', () => {
  const condition = new Template('#{ text | default 5 }')
  expect(condition.fill({})?.result).toEqual('5')
  expect(condition.fill({ text: 2 })?.result).toEqual('2')
  expect(condition.fill({ text: 5 })?.result).toEqual('5')
  expect(condition.fill({ text: 'hello' })?.result).toEqual('hello')
})

test('default "hello world"', () => {
  const template = new Template('#{ text | default "hello world" }')
  expect(template.fill({})?.result).toEqual('hello world')
  expect(template.fill({ text: 2 })?.result).toEqual('2')
  expect(template.fill({ text: 5 })?.result).toEqual('5')
  expect(template.fill({ text: 'hello' })?.result).toEqual('hello')
})

test('exists', () => {
  const condition = new Condition('text | exists')
  expect(condition.check({})).toBeFalsy()
  expect(condition.check({ text: '' })).toBeTruthy()
  expect(condition.check({ text: 0 })).toBeTruthy()
  expect(condition.check({ text: null })).toBeTruthy()
  expect(condition.check({ text: 'hello' })).toBeTruthy()
  expect(condition.check({ text: 'shello' })).toBeTruthy()
  expect(condition.check({ text: 'hellos' })).toBeTruthy()
  expect(condition.check({ text: 'shellos' })).toBeTruthy()
  expect(condition.check({ text: 5 })).toBeTruthy()
})

test('in (filename in string list)', () => {
  const condition = new Condition('text | in "file" "file2"')
  expect(condition.check({})).toBeFalsy()
  expect(condition.check({ text: '' })).toBeFalsy()
  expect(condition.check({ text: 'file' })).toBeTruthy()
  expect(condition.check({ text: 'file2' })).toBeTruthy()
  expect(condition.check({ text: 'file3' })).toBeFalsy()
  expect(condition.check({ text: 'f' })).toBeFalsy()
  expect(condition.check({ text: '2' })).toBeFalsy()
  expect(condition.check({ text: 2 })).toBeFalsy()
})

test('in (filename in variable)', () => {
  const condition = new Condition('text | in list')
  expect(() => condition.check({})).toThrow()
  expect(() => condition.check({ text: '5' })).toThrow()
  expect(condition.check({ list: 5, text: '5' })).toBeFalsy()
  expect(condition.check({ list: '5', text: '5' })).toBeTruthy()
  expect(condition.check({ list: ['file', 'file2'], text: 'file' })).toBeTruthy()
  expect(condition.check({ list: ['file', 'file2'], text: 'file2' })).toBeTruthy()
  expect(condition.check({ list: ['file', 'file2'], text: 'file3' })).toBeFalsy()
  expect(condition.check({ list: 'file,file2', text: 'file' })).toBeTruthy()
  expect(condition.check({ list: 'file,file2', text: 'file2' })).toBeTruthy()
  expect(condition.check({ list: 'file,file2', text: 'file3' })).toBeFalsy()
  expect(condition.check({ list: ['file', 'file2'], text: 'f' })).toBeFalsy()
  expect(condition.check({ list: ['file', 'file2'], text: '2' })).toBeFalsy()
  expect(condition.check({ list: ['file', 'file2'], text: 2 })).toBeFalsy()
  expect(condition.check({ list: 'file,file2', text: 'f' })).toBeFalsy()
  expect(condition.check({ list: 'file,file2', text: '2' })).toBeFalsy()
  expect(condition.check({ list: 'file,file2', text: 2 })).toBeFalsy()
})

test('in (filename in variable)', () => {
  const condition = new Condition('text | in list')
  expect(() => condition.check({})).toThrow()
  expect(() => condition.check({ text: '5' })).toThrow()
  expect(condition.check({ list: 5, text: '5' })).toBeFalsy()
  expect(condition.check({ list: '5', text: '5' })).toBeTruthy()
  expect(condition.check({ list: ['file', 'file2'], text: 'file' })).toBeTruthy()
  expect(condition.check({ list: ['file', 'file2'], text: 'file2' })).toBeTruthy()
  expect(condition.check({ list: ['file', 'file2'], text: 'file3' })).toBeFalsy()
  expect(condition.check({ list: 'file,file2', text: 'file' })).toBeTruthy()
  expect(condition.check({ list: 'file,file2', text: 'file2' })).toBeTruthy()
  expect(condition.check({ list: 'file,file2', text: 'file3' })).toBeFalsy()
  expect(condition.check({ list: ['file', 'file2'], text: 'f' })).toBeFalsy()
  expect(condition.check({ list: ['file', 'file2'], text: '2' })).toBeFalsy()
  expect(condition.check({ list: ['file', 'file2'], text: 2 })).toBeFalsy()
  expect(condition.check({ list: 'file,file2', text: 'f' })).toBeFalsy()
  expect(condition.check({ list: 'file,file2', text: '2' })).toBeFalsy()
  expect(condition.check({ list: 'file,file2', text: 2 })).toBeFalsy()
})

test('in (mixed list)', () => {
  const condition = new Condition('text | in 5 "two" 7 "seven"')
  expect(condition.check({})).toBeFalsy()
  expect(condition.check({ text: '5' })).toBeFalsy()
  expect(condition.check({ text: 5 })).toBeTruthy()
  expect(condition.check({ text: 7 })).toBeTruthy()
  expect(condition.check({ text: 8 })).toBeFalsy()
  expect(condition.check({ text: 'two' })).toBeTruthy()
  expect(condition.check({ text: 'seven' })).toBeTruthy()
  expect(condition.check({ text: 'eight' })).toBeFalsy()
})

test('keep with no variable name (pattern)', () => {
  const pattern = new Pattern('#{ word : theWord | keep }')
  expect(pattern.match('hello')).toMatchObject({ theWord: 'hello', '@keep': { theWord: 'hello' } })
  expect(pattern.match('popsicle')).toMatchObject({ theWord: 'popsicle', '@keep': { theWord: 'popsicle' } })
})

test('keep with variable name (pattern)', () => {
  const pattern = new Pattern('#{ word : theWord | keep keepTheWord }')
  expect(pattern.match('hello')).toMatchObject({ theWord: 'hello', '@keep': { keepTheWord: 'hello' } })
  expect(pattern.match('popsicle')).toMatchObject({ theWord: 'popsicle', '@keep': { keepTheWord: 'popsicle' } })
})

test('keep with no variable name with void (pattern)', () => {
  const pattern = new Pattern('#{ word : theWord | keep | void }')
  expect(pattern.match('hello')).toMatchObject({ theWord: undefined, '@keep': { theWord: 'hello' } })
  expect(pattern.match('popsicle')).toMatchObject({ theWord: undefined, '@keep': { theWord: 'popsicle' } })
})

test('keep with variable name and void (pattern)', () => {
  const pattern = new Pattern('#{ word : theWord | keep keepTheWord | void }')
  expect(pattern.match('hello')).toMatchObject({ theWord: undefined, '@keep': { keepTheWord: 'hello' } })
  expect(pattern.match('popsicle')).toMatchObject({ theWord: undefined, '@keep': { keepTheWord: 'popsicle' } })
})

test('keep with no variable name (template)', () => {
  const template = new Template('#{ theWord | keep }')
  expect(template.fill({ theWord: 'hello' })?.store).toMatchObject({ theWord: 'hello' })
  expect(template.fill({ theWord: 'popsicle' })?.store).toMatchObject({ theWord: 'popsicle' })
})

test('keep with variable name (template)', () => {
  const template = new Template('#{ theWord | keep keepTheWord }')
  expect(template.fill({ theWord: 'hello' })?.store).toMatchObject({ keepTheWord: 'hello' })
  expect(template.fill({ theWord: 'popsicle' })?.store).toMatchObject({ keepTheWord: 'popsicle' })
})

test('keep with no variable name with void (template)', () => {
  const template = new Template('#{ theWord | keep | void }')
  expect(template.fill({ theWord: 'hello' })?.store).toMatchObject({ theWord: 'hello' })
  expect(template.fill({ theWord: 'popsicle' })?.store).toMatchObject({ theWord: 'popsicle' })
})

test('keep with variable name and void (template)', () => {
  const template = new Template('#{ theWord | keep keepTheWord | void }')
  expect(template.fill({ theWord: 'hello' })?.store).toMatchObject({ keepTheWord: 'hello' })
  expect(template.fill({ theWord: 'popsicle' })?.store).toMatchObject({ keepTheWord: 'popsicle' })
})

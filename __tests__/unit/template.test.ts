const Template = require('../../src/template').Template

test('incorrect pattern', () => {
  expect(() => new Template('#{')).toThrow()
})

test('unknown variable', () => {
  const template = new Template('#{ unknownVarname }')
  expect(() => template.fill({})).toThrow()
})

test('unknown variable with default', () => {
  const template = new Template('#{ unknownVarname | default "hello" }')
  expect(template.fill({})).toEqual('hello')
})

test('template with no modifiers', () => {
  const template = new Template('this is a template')
  expect(template.fill({})).toBe('this is a template')
})

test('template with base modifier', () => {
  const template = new Template('Hello #{ name }')
  expect(() => template.fill({})).toThrow()
  expect(() => template.fill({ mane: 'nebrot' })).toThrow()
  expect(template.fill({ name: 'Torben' })).toBe('Hello Torben')
  expect(template.fill({ name: 'AFJO' })).toBe('Hello AFJO')
})

test('template with tool modifiers (name length)', () => {
  const template = new Template('your name has #{ name | length } characters including spaces.')

  expect(template.fill({ name: 'Anders Frederik Jørgensen' })).toBe('your name has 25 characters including spaces.')
  expect(template.fill({ name: 'Lassi' })).toBe('your name has 5 characters including spaces.')
  expect(template.fill({ name: '' })).toBe('your name has 0 characters including spaces.')
  expect(() => template.fill({})).toThrow()
})

test('template with multiple (same) base modifiers (name length)', () => {
  const template = new Template('#{ name | length } is equal to #{ name | length }')

  expect(template.fill({ name: 'Anders Frederik Jørgensen' })).toBe('25 is equal to 25')
  expect(template.fill({ name: 'Lassi' })).toBe('5 is equal to 5')
  expect(template.fill({ name: '' })).toBe('0 is equal to 0')
  expect(() => template.fill({})).toThrow()
})

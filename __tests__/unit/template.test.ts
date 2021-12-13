export {}
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
  expect(template.fill({})?.result).toBe('hello')
})

test('template with no modifables', () => {
  const template = new Template('this is a template')
  expect(template.fill({})?.result).toBe('this is a template')
})

test('template with modifable', () => {
  const template = new Template('Hello #{ name }')
  expect(() => template.fill({})?.result).toThrow()
  expect(() => template.fill({ mane: 'nebrot' })?.result).toThrow()
  expect(template.fill({ name: 'Torben' })?.result).toBe('Hello Torben')
  expect(template.fill({ name: 'AFJO' })?.result).toBe('Hello AFJO')
})

test('template with single letter modifable', () => {
  const template = new Template('Hello #{ n }')
  expect(() => template.fill({})?.result).toThrow()
  expect(() => template.fill({ m: 'nebrot' })?.result).toThrow()
  expect(() => template.fill({ mane: 'nebrot' })?.result).toThrow()
  expect(template.fill({ n: 'Torben' })?.result).toBe('Hello Torben')
  expect(template.fill({ n: 'AFJO' })?.result).toBe('Hello AFJO')
})

test('template with tool modifiers (name length)', () => {
  const template = new Template('your name has #{ name | length } characters including spaces.')

  expect(template.fill({ name: 'Anders Frederik Jørgensen' })?.result).toBe('your name has 25 characters including spaces.')
  expect(template.fill({ name: 'Lassi' })?.result).toBe('your name has 5 characters including spaces.')
  expect(template.fill({ name: '' })?.result).toBe('your name has 0 characters including spaces.')
  expect(() => template.fill({})).toThrow()
})

test('template with multiple (same) base modifiers (name length)', () => {
  const template = new Template('#{ name | length } is equal to #{ name | length }')

  expect(template.fill({ name: 'Anders Frederik Jørgensen' })?.result).toBe('25 is equal to 25')
  expect(template.fill({ name: 'Lassi' })?.result).toBe('5 is equal to 5')
  expect(template.fill({ name: '' })?.result).toBe('0 is equal to 0')
  expect(() => template.fill({})).toThrow()
})

test('multiline template', () => {
  expect(() =>new Template('CG 1-120 ADD 1 "sport-overlay/index" 0\nMIXER 1-120 OPACITY 1')).not.toThrow()
  const template = new Template('CG 1-120 ADD 1 "sport-overlay/index" 0\nMIXER 1-120 OPACITY 1')
  expect(template.fill({ name: 'Anders Frederik Jørgensen' })?.result).toBe('CG 1-120 ADD 1 "sport-overlay/index" 0\nMIXER 1-120 OPACITY 1')
  expect(template.fill({ name: 'Lassi' })?.result).toBe('CG 1-120 ADD 1 "sport-overlay/index" 0\nMIXER 1-120 OPACITY 1')
  expect(template.fill({ name: '' })?.result).toBe('CG 1-120 ADD 1 "sport-overlay/index" 0\nMIXER 1-120 OPACITY 1')
  expect(template.fill({})?.result).toBe('CG 1-120 ADD 1 "sport-overlay/index" 0\nMIXER 1-120 OPACITY 1')
})

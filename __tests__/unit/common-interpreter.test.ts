export {}
const { interpretModifier } = require('../../src/common/interpreter')

test('Unknown domain', () => {
  expect(() => interpretModifier({ domain: '__unknown_domain__', modifier: 'base', pattern: 'unknown' }, 'some-var')).toThrow()
  expect(() => interpretModifier({ domain: '__unknown_domain__', modifier: 'base', pattern: '' }, 'some-var')).toThrow()
  expect(() => interpretModifier({ domain: '__unknown_domain__', modifier: '', pattern: '' }, 'some-var')).toThrow()
  expect(() => interpretModifier({ domain: '__unknown_domain__', modifier: 'test', pattern: 'test' }, 'some-var')).toThrow()
})

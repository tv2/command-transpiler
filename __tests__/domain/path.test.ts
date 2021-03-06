export {}
const { Rule } = require('../../src/rule')
const { runPlatform } = require('../platform.spec')

test('parsing a path', () => {
  const rule = new Rule('The document is saved at #{ path: documentPath }', '')

  runPlatform('linux', () => expect(rule.match('The document is saved at /Users/peterpan/Desktop/document.docx')).toEqual({ documentPath: '/Users/peterpan/Desktop/document.docx' }))
  runPlatform('darwin', () => expect(rule.match('The document is saved at /Users/peterpan/Desktop/document.docx')).toEqual({ documentPath: '/Users/peterpan/Desktop/document.docx' }))
  runPlatform('win32', () => expect(rule.match('The document is saved at C:\\Users\\peterpan\\Desktop\\document.docx')).toEqual({ documentPath: 'C:\\Users\\peterpan\\Desktop\\document.docx' }))
})

test('getting basename of a path', () => {
  const rule = new Rule('', '#{ documentPath | basename }')

  runPlatform('linux', () => expect(rule.fill({ documentPath: '/Users/peterpan/Desktop/document.docx' })?.result).toBe('document.docx'))
  runPlatform('darwin', () => expect(rule.fill({ documentPath: '/Users/peterpan/Desktop/document.docx' })?.result).toBe('document.docx'))
  runPlatform('win32', () => expect(rule.fill({ documentPath: 'C:\\Users\\peterpan\\Desktop\\document.docx' })?.result).toEqual('document.docx'))
})

test('getting dir of a path', () => {
  const rule = new Rule('', '#{ documentPath | dir }')

  runPlatform('linux', () => expect(rule.fill({ documentPath: '/Users/peterpan/Desktop/document.docx' })?.result).toBe('/Users/peterpan/Desktop'))
  runPlatform('darwin', () => expect(rule.fill({ documentPath: '/Users/peterpan/Desktop/document.docx' })?.result).toBe('/Users/peterpan/Desktop'))
  runPlatform('win32', () => expect(rule.fill({ documentPath: 'C:\\Users\\peterpan\\Desktop\\document.docx'})?.result).toEqual('C:\\Users\\peterpan\\Desktop'))
})

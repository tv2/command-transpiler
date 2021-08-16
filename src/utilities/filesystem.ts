
export function basename(path: string): string {
  const index = indexOfBasename(path)
  return path.slice(index).replace(/(\/|\\)$/, '')
}

function indexOfBasename(path: string): number {
  let index: number = path.search(/((?!(\/|\\(?! ))).)+(\/|\\)?$/)
  return index >= 0 ? index : 0
}

export function dir(path: string): string {
  const index = indexOfBasename(path)
  return (index > 0 ? path.slice(0,index) : path).replace(/(\/|\\)$/, '')
}

export function join(pathElements: string[]) {
  const backslashIndex = pathElements.join('').search(/\\(?! )/)
  const slashIndex     = pathElements.join('').search(/\//)
  let separator: string = ''
  switch (true) {
    case backslashIndex === -1 && slashIndex >= 0:
      separator = '/'
      break
    case slashIndex === -1 && backslashIndex >= 0:
      separator = '\\'
      break
    default:
      separator = slashIndex <= backslashIndex ? '/' : '\\'
  }
  return pathElements.join(separator)
}

//function test(path: string) {
//  const b = basename(path)
//  const d = dir(path)
//  const p = join([d,b])
//  const t = p === path.replace(/(\/|\\)$/, '')
//  return { path, b, d, p, t }
//}
//
//console.log(test('/hello/there/some/path\\ name'))
//console.log(test('/hello/there/some/path\ name'))
//console.log(test('/hello/there/some/path-name'))
//console.log(test('/hello/there/some/path name'))
//console.log(test('/hello/there/some/path\\ name/'))
//console.log(test('/hello/there/some/path\ name/'))
//console.log(test('/hello/there/some/path-name/'))
//console.log(test('/hello/there/some/path name/'))
//console.log(test('C:\\hello\\there\\some\\path\\ name'))
//console.log(test('C:\\hello\\there\\some\\path\ name'))
//console.log(test('C:\\hello\\there\\some\\path-name'))
//console.log(test('C:\\hello\\there\\some\\path name'))
//console.log(test('C:\\hello\\there\\some\\path\\ name\\'))
//console.log(test('C:\\hello\\there\\some\\path\ name\\'))
//console.log(test('C:\\hello\\there\\some\\path-name\\'))
//console.log(test('C:\\hello\\there\\some\\path name\\'))

import { resolve } from 'path'

export function basename(path: string): string {
  const index = indexOfBasename(path)
  return path.slice(index).replace(/(\/|\\)$/, '')
}

function indexOfBasename(path: string): number {
  const pathMount = /^(\\\\+|[A-ZÆØÅ]+:)/.test(path) ? mount(path) : ''
  const pathOffset = pathMount.length
  const index: number = path.replace(pathMount, '').search(/((?!(\/|\\(?! ))).)+(\/|\\)?$/)
  return (index >= 0 ? index : 0) + pathOffset
}

export function dir(path: string): string {
  const index = indexOfBasename(path)
  return normalizePath(index > 0 ? path.slice(0, index) : path)
}

export function join(...pathElements: string[]) {
  const backslashIndex = pathElements.join('').search(/\\(?! )/)
  const slashIndex = pathElements.join('').search(/\//)
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

export function normalizePath(path: string): string {
  return path.replace(/(?<=.)[\\\/]+$/, '')
}

export function convertPath(path: string, sourceBase: string, targetBase: string) {
  return path.replace(normalizePath(sourceBase), normalizePath(targetBase))
}

export function mount(path: string, inRecursion: boolean = false): string {
  const normalizedPath = normalizePath(path)
  let _volume: string = normalizedPath

  const choose = (path: string, repl: RegExp, prefix: string) => {
    const ps = path
      .replace(repl, '')
      .split(/(\/|\\(?! ))/)
      .filter((s) => s !== '')
    if (ps.length > 0) {
      _volume = `${prefix}${ps[0]}`
    }
  }

  if (/^\\\\/.test(normalizedPath)) {
    // Network drive
    choose(normalizedPath, /^\\\\+/, '\\\\')
  } else if (/^[A-Z]:/i.test(path)) {
    // Windows drive
    choose(normalizedPath, /^$/, '')
  } else if (/^\/Volumes/i.test(normalizedPath)) {
    // Unix volume/drive
    choose(normalizedPath, /^\/Volumes\/?/i, '/Volumes/')
  } else if (/^\//.test(normalizedPath)) {
    // Root path
    choose('/', /^\0/, '')
  } else if (!inRecursion) {
    _volume = mount(resolve(path))
  }
  return _volume
}


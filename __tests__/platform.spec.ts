type Platform = 'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32'

export function runPlatform(platform: Platform, fun: Function) {
  const hostPlatform = process.platform
  Object.defineProperty(process, 'platform', { value: platform });
  const result = fun()
  Object.defineProperty(process, 'platform', { value: hostPlatform });
  return result
}



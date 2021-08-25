import { ISuccess, IFailure, IContext } from './types'

export function success<T>(value: T, context: IContext): ISuccess<T> {
  return { success: true, value, context }
}
export function failure(expected: string, context: IContext): IFailure {
  return { success: false, expected, context }
}


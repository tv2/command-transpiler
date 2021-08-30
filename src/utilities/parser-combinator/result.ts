import { ISuccess, IFailure, IContext } from './types'

/**
 * @desc   Formats a success result.
 */
export function success<T>(value: T, context: IContext): ISuccess<T> {
  return { success: true, value, context }
}

/**
 * @desc   Formats a failure result.
 */
export function failure(expected: string, context: IContext): IFailure {
  return { success: false, expected, context }
}

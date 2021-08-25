export type IParser<T> = (context: IContext) => IResult<T>

export type IContext = Readonly<{
  text: string,
  index: number,
}>

export type IResult<T> = ISuccess<T> | IFailure

export type ISuccess<T> = Readonly<{
  success: true,
  value: T,
  context: IContext
}>

export type IFailure = Readonly<{
  success: false,
  expected: string,
  context: IContext,
}>

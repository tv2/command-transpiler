export type IParser<T> = (context: IContext) => IResult<T>

export type IContext = Readonly<{
  text: string
  index: number
}>

export type IResult<T> = ISuccess<T> | IFailure

export type ISuccess<T> = Readonly<{
  success: true
  context: IContext
  value: T
  longestBranch?: IFailure
}>

export type IFailure = Readonly<{
  success: false
  context: IContext
  expected: string
}>

export type IModifier = (value: any, args: object) => any
export interface IModifierContext {
  args: object,
  modifier: IModifier
}

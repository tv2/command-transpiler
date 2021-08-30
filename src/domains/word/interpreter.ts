import { IModifier, IInterpreterContext, IInterpret } from '../../common/types'

function interpretBaseModifier({}: IInterpreterContext): IInterpret {
  return store => store
}

// TODO: Check how to best use type here
export default function interpretModifier({ modifier: type, args }: IModifier, varname: string) {
  const context = { varname, args }
  switch (type) {
    case 'base': return interpretBaseModifier(context)
    default:
      throw Error('Unknown Word modifier: ' + type)
  }
}

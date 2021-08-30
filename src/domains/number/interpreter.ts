import { IModifier, IInterpreterContext, IInterpret } from '../../common/types'

function interpretBaseModifier({ varname }: IInterpreterContext): IInterpret {
  return store => ({ ...store, [varname]: parseInt(store[varname], 10) })
}

function interpretInc({ varname, args }: IInterpreterContext): IInterpret {
  return store => ({ ...store, [varname]: store[varname] + args!.amount })
}

function interpretDec({ varname, args }: IInterpreterContext): IInterpret {
  return store => ({ ...store, [varname]: store[varname] - args!.amount })
}
function interpretMod({ varname, args }: IInterpreterContext): IInterpret {
  return store => ({ ...store, [varname]: store[varname] % args!.amount })
}

// TODO: Check how to best use type here
export default function interpretModifier({ modifier: type, args }: IModifier, varname: string) {
  const context = { varname, args }
  switch (type) {
    case 'base': return interpretBaseModifier(context)
    case 'inc': return interpretInc(context)
    case 'dec': return interpretDec(context)
    case 'mod': return interpretMod(context)
    default:
      throw Error('Unknown Number modifier: ' + type)
  }
}

import { IModifier, IInterpreterContext, IInterpret } from '../../common/types'

export function interpretLength({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname].length ? store[varname].length : 0 })
}

export function interpretToString({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname].toString() })
}

export function interpretEqual({ varname, args }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname] === args!.value })
}

export function interpretNot({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: !store[varname] })
}

// TODO: Check how to best use type here
export default function interpretModifier({ modifier: type, args }: IModifier, varname: string) {
  const context = { varname, args }
  switch (type) {
    case 'length': return interpretLength(context)
    case 'toString': return interpretToString(context)
    case 'equal': return interpretEqual(context)
    case 'not': return interpretNot(context)
    default:
      throw Error(`Unknown General modifier: ${type}`)
  }
}

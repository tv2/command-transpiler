import { IModifier, IInterpreterContext, IInterpret } from '../../common/types'
import { evalLiteral } from '../../base/interpreter'

export function interpretLength({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname].length ? store[varname].length : 0 })
}

export function interpretToString({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname].toString() })
}

export function interpretEqual({ varname, args }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname] === evalLiteral(args!.value, store) })
}

export function interpretGreater({ varname, args }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname] > evalLiteral(args!.value, store) })
}

export function interpretLess({ varname, args }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname] < evalLiteral(args!.value, store) })
}

export function interpretDefault({ varname, args }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname] === undefined ? args!.value : store[varname] })
}

export function interpretNot({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: !store[varname] })
}

export function interpretExist({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: varname in store && store[varname] !== undefined })
}
// TODO: Redefine
export function interpretIn({ varname, args }: IInterpreterContext): IInterpret {
  return (store) => {
    let value: any[] = args!.value
    // Variable name
    if (typeof args!.value === 'object' && args!.value.type === 'variable') {
      if (args!.value.varname in store) {
        const varValue = store[args!.value.varname]
        if (typeof varValue === 'string') {
          value = varValue.split(',')
        } else {
          value = Array.isArray(varValue) ? varValue : [varValue]
        }
      } else {
        throw Error(`Variable ${args!.value.varname} is undefined.`)
      }
    }
    return { ...store, [varname]: value.includes(store[varname]) }
  }
}

export function interpretKeep({ varname, args }: IInterpreterContext): IInterpret {
  const argVarname = args?.varname ?? varname
  return (store) => ({
    ...store,
    [argVarname]: store[varname],
    '@keep': {
      ...store['@keep'],
      [argVarname]: store[varname]
    }
  })
}
export function interpretVoid({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: undefined })
}

export default function interpretModifier({ modifier: type, args }: IModifier, varname: string) {
  const context = { varname, args }
  switch (type) {
    case 'length': return interpretLength(context)
    case 'toString': return interpretToString(context)
    case 'default': return interpretDefault(context)
    case 'equal': return interpretEqual(context)
    case 'greater': return interpretGreater(context)
    case 'less': return interpretLess(context)
    case 'not': return interpretNot(context)
    case 'exist': return interpretExist(context)
    case 'in': return interpretIn(context)
    case 'keep': return interpretKeep(context)
    case 'void': return interpretVoid(context)
    default:
      throw Error(`Unknown General modifier: ${type}`)
  }
}

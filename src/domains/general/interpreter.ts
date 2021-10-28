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

export function interpretDefault({ varname, args }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: store[varname] === undefined ? args!.value : store[varname] })
}

export function interpretNot({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: !store[varname] })
}

export function interpretExist({ varname }: IInterpreterContext): IInterpret {
  return (store) => ({ ...store, [varname]: varname in store && store[varname] !== undefined })
}
export function interpretIn({ varname, args }: IInterpreterContext): IInterpret {
  return (store) => {
    let value: any[] = args!.value
    // Variable name
    if (typeof args!.value === 'string') {
      if (args!.value in store) {
        const varValue = store[args!.value]
        if (typeof varValue === 'string') {
          value = varValue.split(',')
        } else {
          value = Array.isArray(varValue) ? varValue : [varValue]
        }
      } else {
        throw Error(`Variable ${args!.value} is undefined.`)
      }
    }
    return { ...store, [varname]: value.includes(store[varname]) }
  }
}

// TODO: Check how to best use type here
export default function interpretModifier({ modifier: type, args }: IModifier, varname: string) {
  const context = { varname, args }
  switch (type) {
    case 'length': return interpretLength(context)
    case 'toString': return interpretToString(context)
    case 'default': return interpretDefault(context)
    case 'equal': return interpretEqual(context)
    case 'not': return interpretNot(context)
    case 'exist': return interpretExist(context)
    case 'in': return interpretIn(context)
    default:
      throw Error(`Unknown General modifier: ${type}`)
  }
}

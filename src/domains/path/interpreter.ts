import { IModifier, IInterpreterContext, IInterpret } from '../../common/types'
import { basename, dir } from '../../utilities/filesystem'

function interpretBaseModifier({}: IInterpreterContext): IInterpret {
  return store => store
}

function interpretDir({ varname }: IInterpreterContext): IInterpret {
  return store => ({ ...store, [varname]: dir(store[varname]) })
}

function interpretBasename({ varname }: IInterpreterContext): IInterpret {
  return store => ({ ...store, [varname]: basename(store[varname]) })
}

// TODO: Check how to best use type here
export default function interpretModifier({ modifier: type, args }: IModifier, varname: string) {
  const context = { varname, args }
  switch (type) {
    case 'base': return interpretBaseModifier(context)
    case 'basename': return interpretBasename(context)
    case 'dir': return interpretDir(context)
    default:
      throw Error('Unknown Path modifier: ' + type)
  }
}

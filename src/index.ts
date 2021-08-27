import { Template } from './transpiler/template'
import { Pattern } from './transpiler/pattern'
import { inspect } from 'util'

const pattern = new Pattern('We have #{ number : dogs | toInteger | inc 5 | dec | inc | dec 10 | inc 2 } dogs.')
const template = new Template('I wish we had #{ dogs } dogs.')

console.log('pattern:', pattern.raw)
console.log('template:', template.raw)
const store = pattern.match('We have 5 dogs.')
console.log('matched vars:', inspect(store, { depth: 10 }))

if (store !== null) {
  console.log('filled template', template.fill(store))
}

import { pattern } from './parser'

const result = pattern.parse('we have #{ number : dogs | toInteger | inc 5 | dec | inc | dec 10 } dogs.')

console.log(JSON.stringify(result, null, 4))

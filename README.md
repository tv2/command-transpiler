# Command Transpiler

The project aims to create a flexible transpiler that transpiles commands from one protocol to another.

The transpiler is a set of rules, which consists of a pattern and a template. A pattern is used to distinguish incoming commands and extract data from them. Templates are used to convert the incoming command, by inserting and modifying the extracted data. 

## Examples

Pattern: `ADD #{ number : amount }`
Template: `PLUS #{ amount }`
Example: `ADD 5` => `PLUS 5`

Pattern: `ADDINC #{ number : amount | toInteger | inc 1 }`
Template: `PLUS #{ amount }`
Example: `ADDINC 5` => `PLUS 6`


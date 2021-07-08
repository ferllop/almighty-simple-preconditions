import { CodeParser } from '../../../src/utils/parsers/CodeParser.js'
import { assert, suite } from '../../test-config.js'

const codeParser = suite('CodePaser')

const codeLines = `import * from whatever
function action(argument1) {
  precondition(argument1 > 0)
  return argument * 2
}`
/**@type {CodeParser} */
let sut
codeParser.before.each(() => {
  sut = new CodeParser(codeLines)
})

codeParser('should return a string with the arguments of a given method in a given line', () => {
  assert.equal(sut.getFunctionArguments(2, 'action'), 'argument1')
})

codeParser.run()

import { assert, suite } from './test-config.js'
import { MultilineParser } from '../src/utils/parsers/MultilineParser.js'

const multilineParser = suite('MultilineParser')

const line1 = 'Line 1'
const line2 = 'Line 2'
const multiline = `${line1}
${line2}`

/**@type {MultilineParser} */
let sut
multilineParser.before.each(() => {
    sut = new class extends MultilineParser{
        startingLine() {
            return 1
        }
    }(multiline)
})

multilineParser('should get content of a concrete line in a multiline string', () => {
    assert.equal(sut.getLine(2), line2)
})

multilineParser.run()

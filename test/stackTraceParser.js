import { assert, suite } from './test-config.js'
import { StackTraceParser } from '../src/utils/parsers/StackTraceParser.js'
import { ClientClass } from './ClientClass.js'
import { WithPreconditionClass } from './WithPreconditionClass.js'

const stackTraceParser = suite('StackTraceParser')

let stackTrace
/**@type {StackTraceParser} */
let sut
stackTraceParser.before.each(() => {
    stackTrace = ClientClass.getErrorStackTrace()
    sut = new StackTraceParser(stackTrace)
})


stackTraceParser('should get the filepath of a string with a file:// filepath', () => {
    const filepath = WithPreconditionClass.FILEPATH
    const stackTrace = ` at precondition file://${filepath}:20:25`
    const sut = new StackTraceParser(stackTrace)
    assert.equal(sut.getErrorLineFilepath(0), filepath)
})

stackTraceParser('should get the line where precondition not meet is declared in a file', () => {
    const codeLine = 20
    const stackTrace = ` at file:///directory/something.js:${codeLine}:25`
    const sut = new StackTraceParser(stackTrace)
    assert.equal(sut.getErrorCodelineLocation(0), codeLine)
})

stackTraceParser.run()

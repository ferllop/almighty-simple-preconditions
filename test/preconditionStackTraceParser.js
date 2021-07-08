import { assert, suite } from './test-config.js'
import { ClientClass } from './ClientClass.js'
import { WithPreconditionClass } from './WithPreconditionClass.js'
import { PreconditionStackTraceParser } from '../src/PreconditionStackTraceParser.js'

const preconditionStackTraceParser = suite('PreconditionStackTraceParser')

let stackTrace
/**@type {PreconditionStackTraceParser} */
let sut
preconditionStackTraceParser.before.each(() => {
    stackTrace = ClientClass.getErrorStackTrace()
    sut = new PreconditionStackTraceParser(stackTrace)
})


preconditionStackTraceParser('should get the argument of the offended precondition', () => {
    assert.equal(sut.getOffendedPreconditionArgument(), WithPreconditionClass.PRECONDITION_ARGUMENT )  
})

preconditionStackTraceParser('should get the filename where the offended precondition is written', () => {
    assert.equal(sut.getOffendedPreconditionFilepath(), WithPreconditionClass.FILEPATH)
})

preconditionStackTraceParser('should get the line where the offended precondition is written', () => {
    assert.equal(sut.getOffendedPreconditionCodeLine(), WithPreconditionClass.PRECONDITION_LINE)
})

preconditionStackTraceParser('should get the offending call', () => {
    assert.equal(sut.getOffendingCall().trim(), ClientClass.OFFENDING_CALL)
})

preconditionStackTraceParser('should get the filename where the offending call is written', () => {
    assert.equal(sut.getOffendingCallFilepath(), ClientClass.FILEPATH)
})

preconditionStackTraceParser('should get the line where the offending call is written', () => {
    assert.equal(sut.getOffendingCallCodeLine(), ClientClass.OFENDING_CALL_LINE)
})


preconditionStackTraceParser.run()

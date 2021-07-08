import { OffendedPrecondition } from '../src/OffendedPrecondition.js'
import { OffendingCall } from '../src/OffendingCall.js'
import { PreconditionStackTraceParser } from '../src/PreconditionStackTraceParser.js'
import { ClientClass } from './ClientClass.js'
import { assert, suite } from './test-config.js'
import { WithPreconditionClass } from './WithPreconditionClass.js'

const offendedPrecondition = suite('OffendedPrecondition')

/**@type {OffendedPrecondition} */
let sut
offendedPrecondition.before.each(() => {
    const stackTrace = ClientClass.getErrorStackTrace()
    const parser = new PreconditionStackTraceParser(stackTrace)
    sut = new OffendedPrecondition(parser)
})

offendedPrecondition('should have a field with the precondition argument', () => {
    assert.equal(sut.getArgument(), WithPreconditionClass.PRECONDITION_ARGUMENT)
})

offendedPrecondition.run()

import { assert, suite } from '../test-config.js'
import { OffendingCall } from '../../src/models/OffendingCall.js'
import { PreconditionStackTraceParser } from '../../src/models/PreconditionStackTraceParser.js'
import { ClientClass } from '../test-helpers/ClientClass.js'

const offendingCall = suite('OffendingCall')

/**@type {OffendingCall} */
let sut
offendingCall.before.each(() => {
    const stackTrace = ClientClass.getErrorStackTrace()
    const parser = new PreconditionStackTraceParser(stackTrace)
    sut = new OffendingCall(parser)
})

offendingCall('should have a field with the offending call', () => {
    assert.equal(sut.getCall().trim(), ClientClass.OFFENDING_CALL)
})

offendingCall.run()

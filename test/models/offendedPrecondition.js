import { OffendedPrecondition } from '../../src/models/OffendedPrecondition.js'
import { PreconditionStackTraceParser } from '../../src/models/PreconditionStackTraceParser.js'
import { ClientClass } from '../test-helpers/ClientClass.js'
import { assert, suite } from '../test-config.js'
import { WithPreconditionClass } from '../test-helpers/WithPreconditionClass.js'

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

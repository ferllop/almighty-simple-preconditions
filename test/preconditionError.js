import { PreconditionError } from '../preconditions.js'
import { WithPreconditionClass } from './WithPreconditionClass.js'
import { suite, assert } from './test-config.js'
import { ClientClass } from './ClientClass.js'

const preconditionError = suite('PreconditionError')

/**@type {PreconditionError} */
let sut
preconditionError.before.each(() => {
    sut = ClientClass.getError()
})

preconditionError('should have a field with the offended precondition argument', () => {
        assert.equal(sut.offendedPrecondition, WithPreconditionClass.PRECONDITION_ARGUMENT)
})

preconditionError('should have a field with the offensive precondition method', () => {
    assert(sut.offendingCall.includes(ClientClass.OFFENDING_CALL))
})

preconditionError('if message is provided, it should have a field with the offensive precondition method', () => {
    assert(sut.offendingCall.includes(ClientClass.OFFENDING_CALL))
})

preconditionError.run()

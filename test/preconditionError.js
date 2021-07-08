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

preconditionError('should have a field with the offended precondition', () => {
        assert(sut.offendedPrecondition)
})

preconditionError('should have a field with the offending call', () => {
    assert(sut.offendingCall)
})

preconditionError.run()

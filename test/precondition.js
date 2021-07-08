import { suite, assert } from './test-config.js'
import { PreconditionError } from '../preconditions.js'
import { ClientClass } from './ClientClass.js'

const precondition = suite("Precondition")

precondition.before.each(() => {
    process.env.ENABLE_PRECONDITIONS = 'true'
})

precondition('should do nothing if ENABLE_PRECONDITIONS environment variable is not set', () => {
    delete process.env.ENABLE_PRECONDITIONS
    assert.doesNotThrow(() => new ClientClass().offendingMethod(), Error)
})

precondition('should not throw PreconditionError when precondition is meet', () => {
    assert.doesNotThrow(() => new ClientClass().notOffendingMethod(), PreconditionError)
})

precondition('should throw a PreconditionError when precondition is not meet', () => {
    assert.throws(() => new ClientClass().offendingMethod(), PreconditionError)
})

precondition.run()

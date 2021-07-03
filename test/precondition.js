import { suite, assert } from './test-config.js'
import { precondition as preconditionSUT, PreconditionError } from '../preconditions.js'

const precondition = suite("Precondition")

precondition.before.each(() => {
    process.env.ENABLE_PRECONDITIONS = 'true'
})

precondition('should do nothing if ENABLE_PRECONDITIONS environment variable is not set', () => {
    delete process.env.ENABLE_PRECONDITIONS
    assert.doesNotThrow(() => preconditionSUT(false), Error)
})

precondition('should not throw PreconditionError when precondition is meet', () => {
    assert.doesNotThrow(() => preconditionSUT(true), Error)
})

precondition('should throw a PreconditionError when precondition is not meet', () => {
    assert.throws(() => preconditionSUT(false), PreconditionError)
})

precondition.run()

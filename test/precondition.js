import { suite, assert } from './test-config.js'
import { precondition as preconditionSUT, PreconditionError } from '../preconditions.js'

const precondition = suite("Precondition")

precondition('should do nothing when precondition is meet', () => {
    assert.doesNotThrow(() => preconditionSUT(true), Error)
})

precondition('should throw a PreconditionError when precondition is not meet', () => {
    assert.throws(() => preconditionSUT(false), PreconditionError)
})

precondition.run()

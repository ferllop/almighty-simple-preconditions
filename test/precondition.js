import { suite, assert } from './test-config.js'
import { precondition as preconditionSUT, PreconditionError } from '../preconditions.js'
import { OffendingClass } from './OffendingClass.js'

const precondition = suite("Precondition")

precondition.before.each(() => {
    process.env.ENABLE_PRECONDITIONS = 'true'
})

precondition('should do nothing if ENABLE_PRECONDITIONS environment variable is not set', () => {
    delete process.env.ENABLE_PRECONDITIONS
    assert.doesNotThrow(() => new OffendingClass().offendingMethod(), Error)
})

precondition('should not throw PreconditionError when precondition is meet', () => {
    assert.doesNotThrow(() => new OffendingClass().notOffendingMethod(), PreconditionError)
})

precondition('should throw a PreconditionError when precondition is not meet', () => {
    assert.throws(() => new OffendingClass().offendingMethod(), PreconditionError)
})

precondition('should show a message with the evaluation sentence of the precondition', () => {
    try {
        // @ts-ignore
        new OffendingClass().offendingMethod()
    } catch (e) {
        console.log(e.message)
        assert(e.message.includes(OffendingClass.PRECONDITION_ARGUMENT))
    }
})

precondition.run()

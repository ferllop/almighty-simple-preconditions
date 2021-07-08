import { ErrorParticipant } from '../src/ErrorParticipant.js'
import { PreconditionStackTraceParser } from '../src/PreconditionStackTraceParser.js'
import { ClientClass } from './ClientClass.js'
import { assert, suite } from './test-config.js'
import { WithPreconditionClass } from './WithPreconditionClass.js'

const errorParticipant = suite('ErrorParticipant')

/**@type {ErrorParticipant} */
let sut
errorParticipant.before.each(() => {
    const stackTrace = ClientClass.getErrorStackTrace()
    const parser = new PreconditionStackTraceParser(stackTrace)
    sut = new class extends ErrorParticipant {
        extractCodeLine() {
            return 1
        }

        extractFilepath() {
            return '/the/filepath'
        }
    }(parser)
})

errorParticipant('should have a field with codeLine', () => {
    assert.equal(sut.getCodeLine(), 1)
})

errorParticipant('should have a field with the filepath', () => {
assert.equal(sut.getFilepath(), '/the/filepath')
})

errorParticipant.run()

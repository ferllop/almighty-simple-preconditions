import { PreconditionError } from '../preconditions.js'
import { OffendingClass } from './OffendingClass.js'
import { suite, assert } from './test-config.js'

const preconditionError = suite('PreconditionError')
// @ts-ignore


/**@type {PreconditionError} */
let errorSUT
preconditionError.before.each(() => {
    process.env.ENABLE_PRECONDITIONS = 'true'
    try {
        new OffendingClass().offendingMethod()
        assert(false)
    } catch (error) {
        errorSUT = error
    }
})

preconditionError('should extract the stack trace line of the precondition not meet', () => {
        const offendingMethodLine = errorSUT.getPreconditionNotMeetErrorLine(errorSUT.stack)
        assert(offendingMethodLine.includes(OffendingClass.FILEPATH))
    })

preconditionError('should get the filepath of a string with a file:// filepath', () => {
        const filepath = '/some/file/path/file.js'
        const stackTraceLine = ` at file://${filepath}:20:25`
        assert.equal(errorSUT.getErrorPreconditionNotMeetFilepath(stackTraceLine), filepath)
    })

preconditionError('should get the line where precondition not meet is declared in a file', () => {
    const codeLine = 20
    const stackTraceLine = ` at file:///directory/something.js:${codeLine}:25`
    const codeLineResult = 20 - 1
    assert.equal(errorSUT.getErrorPreconditionLine(stackTraceLine), codeLineResult)
})

preconditionError('should get content of a concrete line in a multiline string', () => {
    const line2 = 'Line 2'
    const codeLines = `
Line 1
${line2}
    `
    assert.equal(errorSUT.getCodeLine(codeLines, 2), line2)
})

preconditionError('should get the precondition argument on a string with a precondition written', () => {
    const precondition = 'arg1 >= arg2'
    assert.equal(errorSUT.getPreconditionArgument(`precondition(${precondition}) {`), precondition)
})

preconditionError('should be capable of get a string with the evaluation of the precondition not meet', () => {
    assert(errorSUT.getPreconditionNotMeetSentence().includes(OffendingClass.PRECONDITION_ARGUMENT))
})

preconditionError.run()

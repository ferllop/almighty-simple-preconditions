import { MessageBuilder } from './utils/MessageBuilder.js'
import { PreconditionStackTraceParser } from './PreconditionStackTraceParser.js'

export class PreconditionError extends Error {
    /**@type {string} */
    offendedPrecondition

    /**@type {string} */
    offendingCall

    /**
     * @param {string} [message]
     */
    constructor(message) {
        super(message)
        const parser = new PreconditionStackTraceParser(this.stack)
        this.offendedPrecondition = parser.getOffendedPreconditionArgument()
        this.offendedPreconditionFilepath = parser.getOffendedPreconditionFilename()
        this.offendedPreconditionCodeLine = parser.getOffendedPreconditionCodeLine()
        this.offendingCall = parser.getOffendingCall()
        this.offendingCallFilepath = parser.getOffendingCallFilename()
        this.offendingCallCodeLine = parser.getOffendingCallCodeLine()
        super.message = this.getMessage()
    }

    getMessage() {
        const builder = new MessageBuilder()
        return builder
            .addPart(`Precondition "${this.offendedPrecondition}"`)
            .addPart(`written on line ${this.offendedPreconditionCodeLine} of file "${this.offendedPreconditionFilepath}"`)
            .addPart(`was offended by call "${this.offendingCall.trim()}"`)
            .addPart(`written on line ${this.offendingCallCodeLine} of file "${this.offendingCallFilepath}"`)
            .setEnd('.')
            .build()

    }
}



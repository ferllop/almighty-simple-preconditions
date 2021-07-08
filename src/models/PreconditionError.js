import { MessageBuilder } from '../utils/MessageBuilder.js'
import { PreconditionStackTraceParser } from './PreconditionStackTraceParser.js'
import { OffendedPrecondition } from './OffendedPrecondition.js'
import { OffendingCall } from './OffendingCall.js'

export class PreconditionError extends Error {
    /**@type {OffendedPrecondition} */
    offendedPrecondition

    /**@type {OffendingCall} */
    offendingCall

    /**
     * @param {string} [message]
     */
    constructor(message) {
        super(message)
        const parser = new PreconditionStackTraceParser(this.stack)
        this.offendedPrecondition = new OffendedPrecondition(parser)
        this.offendingCall = new OffendingCall(parser)
        super.message = this.getMessage()
    }

    getMessage() {
        const builder = new MessageBuilder()
        return builder
            .addPart(`Precondition "${this.offendedPrecondition.getArgument()}"`)
            .addPart(`written on line ${this.offendedPrecondition.getCodeLine()} of file "${this.offendedPrecondition.getFilepath()}"`)
            .addPart(`was offended by call "${this.offendingCall.getCall().trim()}"`)
            .addPart(`written on line ${this.offendingCall.getCodeLine()} of file "${this.offendingCall.getFilepath()}"`)
            .setEnd('.')
            .build()
    }
}



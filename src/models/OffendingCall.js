import { ErrorParticipant } from './ErrorParticipant.js'
import { PreconditionStackTraceParser } from '../models/PreconditionStackTraceParser.js'

export class OffendingCall extends ErrorParticipant {
    /**@type {string} argument */
    #call

    /**@param {PreconditionStackTraceParser} parser */
    constructor(parser) {
        super(parser)
        this.#call = parser.getOffendingCall()
    }

    getCall() {
        return this.#call
    }

    extractFilepath() {
        return this.getParser().getOffendingCallFilepath()
    }

    extractCodeLine() {
        return this.getParser().getOffendingCallCodeLine()
    }
}

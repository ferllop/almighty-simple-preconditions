import { ErrorParticipant } from './ErrorParticipant.js'
import { PreconditionStackTraceParser } from '../models/PreconditionStackTraceParser.js'

export class OffendedPrecondition extends ErrorParticipant {
    /**@type {string} argument */
    #argument

    /**@param {PreconditionStackTraceParser} parser */
    constructor(parser) {
        super(parser)
        this.#argument = parser.getOffendedPreconditionArgument()
    }

    getArgument() {
        return this.#argument
    }

    extractFilepath() {
        return this.getParser().getOffendedPreconditionFilepath()
    }

    extractCodeLine() {
        return this.getParser().getOffendedPreconditionCodeLine()
    }

}

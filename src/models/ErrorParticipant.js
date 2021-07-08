import { PreconditionStackTraceParser } from '../models/PreconditionStackTraceParser.js'

/**@abstract */
export class ErrorParticipant {
    /**@type {PreconditionStackTraceParser} */
    #parser

     /**@type {string} filepath*/
    #filepath

    /**@type {number} codeLine */
    #codeLine

    /**@param {PreconditionStackTraceParser} parser */
    constructor(parser) {
        this.#parser = parser
    }

    getFilepath() {
        if (!this.#filepath) {
            this.#filepath = this.extractFilepath()
        }
        return this.#filepath
    }

    /**
     * @abstract 
     * @returns {string} */
    extractFilepath() {
        throw new Error("extractFilepath must be implemented in a subclass")
    }

    getCodeLine() {
        if (!this.#codeLine) {
            this.#codeLine = this.extractCodeLine()
        }
        return this.#codeLine
    }

    /**
     * @abstract 
     * @returns {number} */
    extractCodeLine() {
        throw new Error("extractCodeLine must be implemented in a subclass")
    }

    getParser() {
        return this.#parser
    }
}

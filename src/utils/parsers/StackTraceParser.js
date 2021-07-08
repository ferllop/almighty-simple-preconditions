import { MultilineParser } from './MultilineParser.js'
import fs from 'fs'

export class StackTraceParser extends MultilineParser{

    /**
     * @param {number} lineNumber 
     * @returns {string}
     */
    getErrorLineFilepath(lineNumber) {
        const regexp = /file:\/\/(.*):\d*:\d*/
        const filepath = this.getLine(lineNumber).match(regexp)[1]
        return filepath
    }

    /**
     * @param {number} lineNumber
     * @returns {number}
     */
    getErrorCodelineLocation(lineNumber) {
        const regexp = /:(\d*):/
        const preconditionCodeLine = Number(this.getLine(lineNumber).match(regexp)[1])
        return preconditionCodeLine
    }

    /**
     * @returns {number}
     */
    getLastStackLineNumber() {
        return this.getLinesAsArray().findIndex(line => line.includes('file://'))
    }

    /**
     * @param {number} lineNumber 
     */
    getErrorCodeLines(lineNumber) {
        const filepath = this.getErrorLineFilepath(lineNumber)
        return this.getCodeFromFileSync(filepath)
    }

    /**
     * @param {string} filepath 
     * @returns {string}
     */
    getCodeFromFileSync(filepath) {
        return fs.readFileSync(filepath, 'utf-8')
    }

    startingLine() {
        return 0
    }

}

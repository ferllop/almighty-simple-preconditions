import { MultilineParser } from './MultilineParser.js'

export class CodeParser extends MultilineParser {
    /**
     * @param {number} line 
     * @param {string} method 
     * @returns {string}
     */
    getFunctionArguments(line, method) {
        if (/[^a-zA-Z0-9]/.test(method)) throw Error
        const regex = new RegExp(`${method}\\((.*?)\\)`)
        return this.getLine(line).match(regex)[1]
    }

    startingLine() {
        return 1
    }

}

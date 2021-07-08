/**
 * @abstract
 */
export class MultilineParser {
    /**@type {string} */
    lines

    /**
     * @param {string} lines 
     */
    constructor(lines) {
        this.lines = lines
    }

    getLines() {
        return this.lines
    }

    /**
     * @returns {string[]}
     */
    getLinesAsArray() {
        const regex = /\r?\n/
        return this.getLines().split(regex)
    }

    /**
     * @param {number} line 
     * @returns {string}
     */
    getLine(line) {
        return this.getLinesAsArray()[line - this.startingLine()]
    }

    /**
     * @abstract
     * @returns {number}
     */
    startingLine() {
        throw new Error('startingLine must be implemented by subclass!')
    }
}

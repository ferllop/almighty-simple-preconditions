import fs from 'fs'

export class PreconditionError extends Error {
    /**
     * @param {string} [message]
     */
    constructor(message) {
        super(message)
        this.message = 'PRECONDITION NOT MEET: ' + this.getPreconditionNotMeetSentence() + '\n' + this.message
    }
    
    /**
     * @returns {string}
     */
    getPreconditionNotMeetSentence() {
        const line = this.getPreconditionNotMeetErrorLine(this.stack)
        const filepath = this.getErrorPreconditionNotMeetFilepath(line)
        const preconditionNotMeetCodeLine = this.getErrorPreconditionLine(line)
        const fileContent = this.getCodeFromFileSync(filepath)
        const codeLine = this.getCodeLine(fileContent, preconditionNotMeetCodeLine)
        return this.getPreconditionArgument(codeLine)
    }

    /**
     * @returns {string}
     */
    getPreconditionNotMeetErrorLine(stack) {
        const lineSeparator = /\r?\n/
        const lines = stack.split(lineSeparator)
        const preconditionRegex = /precondition\s\(.*\)$/gm
        const preconditionStackTraceLine = lines.findIndex( line => line.match(preconditionRegex))
        const offendingMethodStackTraceLine = preconditionStackTraceLine + 1
        return lines[offendingMethodStackTraceLine]
    }

    /**
     * @param {string} line 
     * @returns {string}
     */
    getErrorPreconditionNotMeetFilepath(line) {
        const regexp = /file:\/\/(.*):\d*:\d*/
        const filepath = line.match(regexp)[1]
        return filepath
    }

    /**
     * @param {string} line
     * @returns {number}
     */
    getErrorPreconditionLine(line) {
        const regexp = /:(\d*):/
        const preconditionCodeLine = Number(line.match(regexp)[1])
        return preconditionCodeLine - 1
    }

    /**
     * @param {string} codeLines 
     * @param {number} line 
     * @returns {string}
     */
    getCodeLine(codeLines, line) {
        const regex = /\r?\n/
        const codeLine = codeLines.split(regex)[line]
        return codeLine
    }

    /**
     * 
     * @param {string} codeLine 
     * @returns {string}
     */
    getPreconditionArgument(codeLine) {
        const regex = /precondition\((.*)\)/
        const argments = codeLine.match(regex)
        return argments[1]
    }

    /**
     * @param {string} filepath 
     * @returns {Promise<string>}
     */
    async getCodeFromFile(filepath) {
        let fileContent = ''
        await fs.readFile(filepath, 'utf-8', (err, data) => {
            fileContent = data
        })
        return fileContent
    }

    /**
     * @param {string} filepath 
     * @returns {string}
     */
    getCodeFromFileSync(filepath) {
        return fs.readFileSync(filepath, 'utf-8')
    }
}



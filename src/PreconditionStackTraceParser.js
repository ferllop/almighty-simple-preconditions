import { CodeParser } from './utils/parsers/CodeParser.js'
import { StackTraceParser } from './utils/parsers/StackTraceParser.js'

export class PreconditionStackTraceParser extends StackTraceParser {
   
    getOffendedPreconditionArgument() {
        const preconditionTrace = this.getOffendedPreconditionTraceLineNumber()
        const preconditionCodeLine = this.getErrorCodelineLocation(preconditionTrace)
        const codeLines = this.getErrorCodeLines(preconditionTrace)
        return new CodeParser(codeLines).getFunctionArguments(preconditionCodeLine, 'precondition')
    }
    
    getOffendedPreconditionTraceLineNumber() {
        return this.getLastStackLineNumber() + 1
    }
    
    getOffendedPreconditionFilepath() {
        return this.getErrorLineFilepath(this.getOffendedPreconditionTraceLineNumber())
    }
    
    getOffendedPreconditionCodeLine() {
        return this.getErrorCodelineLocation(this.getOffendedPreconditionTraceLineNumber())
    }

    
    getOffendingCall() {
        const offendingCall = this.getOffendingCallTraceLineNumber()
        const lineWithOffendingCall = this.getErrorCodelineLocation(offendingCall)
        const codeLines = this.getErrorCodeLines(offendingCall)
        return new CodeParser(codeLines).getLine(lineWithOffendingCall)
    }

    getOffendingCallTraceLineNumber() {
        return this.getOffendedPreconditionTraceLineNumber() + 1
    }

    getOffendingCallFilepath() {
        return this.getErrorLineFilepath(this.getOffendingCallTraceLineNumber())
    }

    getOffendingCallCodeLine() {
        return this.getErrorCodelineLocation(this.getOffendingCallTraceLineNumber())
    }
 
}

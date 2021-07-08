import { WithPreconditionClass } from './WithPreconditionClass.js'

export class ClientClass {
    
    /**@type {WithPreconditionClass} */
    withPreconditionClass
    
    constructor() {
        this.withPreconditionClass = new WithPreconditionClass()
    }
    
    offendingMethod() {
        this.withPreconditionClass.preconditionedMethod(-1)
    }
    
    notOffendingMethod()  {
        this.withPreconditionClass.preconditionedMethod(1)
    }
    
    // @ts-ignore
    static FILEPATH = new URL('', import.meta.url).pathname
    static OFENDING_CALL_LINE = 13
    static OFFENDING_CALL = 'this.withPreconditionClass.preconditionedMethod(-1)'
    static OFFENDING_METHOD = 'ClientClass.offendingMethod'
    
    static getError() {
        process.env.ENABLE_PRECONDITIONS = 'true'
        let preconditionError
        try {
            new ClientClass().offendingMethod()
        } catch (error) {
            preconditionError = error
        }
        return preconditionError
    }

    static getErrorStackTrace() {
        return ClientClass.getError().stack
    }
    
}

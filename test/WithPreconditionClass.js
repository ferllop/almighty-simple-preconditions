import { precondition } from '../preconditions.js'

export class WithPreconditionClass {
    preconditionedMethod(arg1) {
        precondition(arg1 > 0)
    }

    // @ts-ignore
    static FILEPATH = new URL('', import.meta.url).pathname
    
    static PRECONDITION_LINE = 5
    static PRECONDITION_ARGUMENT = 'arg1 > 0'
    static WITH_PRECONDITION_METHOD = 'WithPreconditionClass.preconditionMethod'

    // @ts-ignore
    static FILEPATH = new URL('', import.meta.url).pathname


}

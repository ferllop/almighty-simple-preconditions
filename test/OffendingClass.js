import { precondition } from '../preconditions.js'

export class OffendingClass {
    static PRECONDITION_ARGUMENT = 'arg1 > 0'
    // @ts-ignore
    static FILEPATH = new URL('', import.meta.url).pathname

    preconditionMethod(arg1) {
        precondition(arg1 > 0)
    }

    offendingMethod() {
        this.preconditionMethod(-1)
    }

    notOffendingMethod()  {
        this.preconditionMethod(1)
    }


}

import { strict as assert } from 'assert'
import { AssertionError } from 'assert'

export function precondition(condition, message) {
  try {
    assert(condition, message)
  } catch (error) {
    if (error instanceof AssertionError) {
      throw new PreconditionError(message)
    } else {
      throw error
    }
  }
}

export class PreconditionError extends Error {

}

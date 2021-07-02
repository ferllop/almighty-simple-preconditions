import { strict as assert } from 'assert'
import { AssertionError } from 'assert'

/**
 * @param {Boolean} condition 
 * @param {string} message 
 * @throws {PreconditionError}
 * @returns {void}
 */
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

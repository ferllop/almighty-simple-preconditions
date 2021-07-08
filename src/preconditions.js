import { strict as assert } from 'assert'
import { AssertionError } from 'assert'
import { PreconditionError } from './PreconditionError.js'

/**
 * @param {Boolean} condition 
 * @param {string} [message] 
 * @throws {PreconditionError}
 * @returns {void}
 */
export function precondition(condition, message) {
  if (isPreconditionsEnabled()) {
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
}

function isPreconditionsEnabled() {
  const variableToEnablePreconditions = 'ENABLE_PRECONDITIONS'
  return process.env[variableToEnablePreconditions] === 'true'
}

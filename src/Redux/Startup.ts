import { createAction } from 'typesafe-actions'

/* ------------- Types and Action Creators ------------- */

export const startup = createAction('STARTUP')

export default {
  startup,
}

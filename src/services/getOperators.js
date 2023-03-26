import { OPERATORS_ENDPOINT } from '../constants'

export const getOperators = () => {
  return fetch(OPERATORS_ENDPOINT)
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching operators')
      }
      return res.json()
    })
    .then(operators => {
      return operators
    })
    .catch((err) => {
      console.error(err)
    // comes here if there is an issue with the response
    // comes here if they is an issue with the request
    })
}

import { TRANSIT_STOPS_ENDPOINT } from '../constants'

export const getTransitEvents = ({ operator }) => {
  const transitUrlWithOperator = `${TRANSIT_STOPS_ENDPOINT}&operator_id=${operator}`
  return fetch(transitUrlWithOperator)
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching transit event')
      }
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      if (err instanceof TypeError) {
        console.error('The provided URL is incorrect. Check your API key')
      } else {
        console.error(err)
      }
    })
}

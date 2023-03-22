import { TRAFFIC_EVENTS_ENDPOINT } from '../constants'

export const getTrafficEvents = () => {
  return fetch(TRAFFIC_EVENTS_ENDPOINT)
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching traffic event')
      }
      return res.json()
    })
    .then(data => {
      return data
    })
}

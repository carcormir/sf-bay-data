import { useEffect, useState } from 'react'
import { getTrafficEvents } from '../services/getTrafficEvents'

export function useTrafficData ({ trafficDataOption }) {
  const [trafficData, setTrafficData] = useState(null)
  const [trafficLoading, setTrafficLoading] = useState(false)
  const [errorTraffic, setErrorTraffic] = useState(false)

  const refreshTrafficData = () => {
    if (!trafficDataOption) {
      setTrafficData(null)
      return
    }

    setTrafficLoading(true)
    getTrafficEvents()
      .then(newTrafficData => {
        if (typeof newTrafficData === 'undefined') {
          throw new Error('Error fetching traffic event')
        }
        setTrafficData(newTrafficData)
        setErrorTraffic(false)
      })
      .catch(err => {
        setErrorTraffic(true)
      })
      .finally(
        setTrafficLoading(false)
      )
  }

  useEffect(refreshTrafficData, [])

  return { trafficData, refreshTrafficData, errorTraffic, trafficLoading }
}

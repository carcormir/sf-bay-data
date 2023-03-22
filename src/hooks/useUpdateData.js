import { useState, useEffect } from 'react'
import { getTrafficEvents } from '../services/getTrafficEvents'

export function useUpdateData () {
  const [trafficData, setTrafficData] = useState()
  const [transitData, setTransitData] = useState()

  const refreshTrafficData = () => {
    console.log('traffic data')
    getTrafficEvents().then(newTrafficData => setTrafficData(newTrafficData))
  }

  const refreshTransitData = () => {
    console.log('transit data')
  }

  useEffect(refreshTrafficData, [])

  return { trafficData, transitData, refreshTrafficData, refreshTransitData }
}

import { useContext, useEffect } from 'react'
import { getTrafficEvents } from '../services/getTrafficEvents'
import DataContext from '../contexts/DataContext'

export function useUpdateData () {
  const { trafficData, setTrafficData, transitData, setTransitData } = useContext(DataContext)

  const refreshTrafficData = () => {
    getTrafficEvents().then(newTrafficData => setTrafficData(newTrafficData))
  }

  const refreshTransitData = () => {
  }

  useEffect(refreshTrafficData, [])

  return { trafficData, transitData, refreshTrafficData, refreshTransitData }
}

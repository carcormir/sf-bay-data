import { useEffect, useState } from 'react'
import { getTransitEvents } from '../services/getTransitEvents'

export function useTransitData ({ transitDataOption, operator }) {
  const [transitData, setTransitData] = useState(null)
  const [transitLoading, setTransitLoading] = useState(false)
  const [errorTransit, setErrorTransit] = useState(false)

  const refreshTransitData = () => {
    if (!transitDataOption) {
      setTransitData(null)
      return
    }

    console.log(operator)
    if (operator === 'undefined' || operator === '') {
      setErrorTransit(true)
      setTransitData(null)
    }

    setTransitLoading(true)
    getTransitEvents({ operator })
      .then(newTransitData => {
        if (typeof newTransitData === 'undefined') {
          throw new Error('Error fetching transit event')
        }
        if (!newTransitData.Contents.dataObjects.ScheduledStopPoint) {
          throw new Error('Error fetching transit event. No data available for the given operator')
        }
        setTransitData(newTransitData)
        setErrorTransit(false)
      })
      .catch(err => {
        setErrorTransit(true)
      })
      .finally(
        setTransitLoading(false)
      )
  }

  useEffect(refreshTransitData, [])

  return { transitData, refreshTransitData, errorTransit, transitLoading }
}

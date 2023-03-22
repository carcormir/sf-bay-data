import { useUpdateData } from '../../hooks/useUpdateData'
import './styles.css'

export default function InfoList () {
  const { trafficData, transitData, refreshTrafficData, refreshTransitData } = useUpdateData()
  return (
    trafficData
      ? trafficData.events.map((trafficEvent) => (
        <p className='info-item' key={trafficEvent.Id}>{trafficEvent.headline}</p>
      ))
      : <p>Loading ...</p>
  )
}

import './styles.css'

export default function InfoList ({ trafficData }) {
  return (
    trafficData
      ? trafficData.events.map((trafficEvent) => (
        <p className='info-item' key={trafficEvent.Id}>{trafficEvent.headline}</p>
      ))
      : <p className='info-item'>No data to display</p>
  )
}

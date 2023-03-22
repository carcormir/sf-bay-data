import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useUpdateData } from '../../hooks/useUpdateData'

import L from 'leaflet'
import roadWorkImg from '../../assets/roadwork.png'
import warningImg from '../../assets/warning.png'
import unknownImg from '../../assets/help.png'

const roadWorkIcon = new L.Icon({
  iconUrl: roadWorkImg,
  iconRetinaUrl: roadWorkImg,
  popupAnchor: [-0, -0],
  iconSize: [20, 20]
})

const incidentIcon = new L.Icon({
  iconUrl: warningImg,
  iconRetinaUrl: warningImg,
  popupAnchor: [-0, -0],
  iconSize: [20, 20]
})

const unknownIcon = new L.Icon({
  iconUrl: unknownImg,
  iconRetinaUrl: unknownImg,
  popupAnchor: [-0, -0],
  iconSize: [20, 20]
})

export default function Map () {
  const { trafficData, transitData, refreshTrafficData, refreshTransitData } = useUpdateData()
  return (
    <MapContainer center={[37.6910, -122.3108]} zoom={8} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
    trafficData
      ? trafficData.events.map((trafficEvent) => (
        <Marker
          key={trafficEvent.Id}
          position={
          [trafficEvent.geography.coordinates[1],
            trafficEvent.geography.coordinates[0]]
          }
          icon={
            trafficEvent.event_type === 'INCIDENT'
              ? incidentIcon
              : trafficEvent.event_type === 'CONSTRUCTION'
                ? roadWorkIcon
                : unknownIcon

          }
        >
          <Popup key={trafficEvent.Id}>
            <strong>Description:</strong> {trafficEvent.headline} <br />
            <strong>Type:</strong> {trafficEvent.event_type} <br />
            <strong>Status:</strong> {trafficEvent.status} <br />
            <strong>Last Update:</strong> {trafficEvent.updated}
          </Popup>
        </Marker>

      ))
      : <p>Loading ...</p>
    }
    </MapContainer>
  )
}

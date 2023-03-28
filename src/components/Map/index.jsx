import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// TODO: All this should be moved to a different file
import L from 'leaflet'
import roadWorkImg from '../../assets/roadwork.png'
import warningImg from '../../assets/warning.png'
import busStopImg from '../../assets/bus-stop.png'
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

const busStopIcon = new L.Icon({
  iconUrl: busStopImg,
  iconRetinaUrl: busStopImg,
  popupAnchor: [-0, -0],
  iconSize: [20, 20]
})

export default function Map ({ trafficData, transitData }) {
  return (
    // TODO: the attributes should be added to a config file
    <MapContainer center={[37.6910, -122.3108]} zoom={8} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {
        // traffic data
        // if there is data available, add them to the map
        trafficData &&
          trafficData.events.map((trafficEvent) => (
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
      }
      {
        // transit data
        // if there is data available, add them to the map
        transitData &&
          transitData.Contents.dataObjects.ScheduledStopPoint.map((transitStop) => (
            <Marker
              key={transitStop.id}
              position={
              [transitStop.Location.Latitude,
                transitStop.Location.Longitude]
              }
              icon={
                transitStop.StopType === 'onstreetBus'
                  ? busStopIcon
                  : transitStop.StopType === 'CONSTRUCTION'
                    ? roadWorkIcon
                    : unknownIcon
              }
            >
              <Popup key={transitStop.Id}>
                <strong>Name:</strong> {transitStop.Name} <br />
                <strong>Type:</strong> {transitStop.StopType} <br />
              </Popup>
            </Marker>
          ))
      }
    </MapContainer>
  )
}

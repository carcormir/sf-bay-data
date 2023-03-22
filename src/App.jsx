import { useEffect, useState } from 'react'
import './App.css'
import { getOperators } from './services/getOperators'
import { useUpdateData } from './hooks/useUpdateData'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import SearchBar from './components/SearchBar'

function App () {
  // const { trafficData, transitData, refreshTrafficData, refreshTransitData } = useUpdateData()
  return (
    <div className='App'>
      <main>
        <h1>511 traffic and alerts page</h1>
        <SearchBar />

        {/* <MapContainer center={[37.6910, -122.3108]} zoom={10} scrollWheelZoom={false}>
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
              >
                <Popup key={trafficEvent.Id}>
                  <strong>Description:</strong> {trafficEvent.headline} <br />
                  <strong>Type:</strong> {trafficEvent.event_type}
                </Popup>
              </Marker>

            ))
            : <p>Loading ...</p>
          }

        </MapContainer> */}

      </main>
    </div>
  )
}

export default App

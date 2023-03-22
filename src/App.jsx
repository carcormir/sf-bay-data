import { useEffect, useState, useContext } from 'react'
import './App.css'
import { getOperators } from './services/getOperators'
import { useUpdateData } from './hooks/useUpdateData'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import SearchBar from './components/SearchBar'
import DataContext, { DataContextProvider } from './contexts/DataContext'
import Map from './components/Map'
import InfoList from './components/InfoList'

function App () {
  return (
    <DataContextProvider>
      <div className='App'>
        <main>
          <h1>511 traffic and transit page</h1>
          <SearchBar />
          <div className='data-grid'>
            <div className='map-container data-row'>
              <Map />
            </div>
            <div className='data-list-container data-row'>
              <span className='traffic-data-title'>Traffic data</span>
              <InfoList />
            </div>
          </div>
        </main>
      </div>
    </DataContextProvider>
  )
}

export default App

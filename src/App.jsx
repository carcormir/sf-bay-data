import './App.css'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import Map from './components/Map'
import InfoList from './components/InfoList'
import { useTrafficData } from './hooks/useTrafficData'
import { useTransitData } from './hooks/useTransitData'
import { getOperators } from './services/getOperators'

function App () {
  const [transitDataOption, setTransitDataOption] = useState(false)
  const [trafficDataOption, setTrafficDataOption] = useState(false)
  const [operators, setOperators] = useState(null)
  const [operator, setOperator] = useState('')

  const { trafficData, refreshTrafficData, errorTraffic, trafficLoading } = useTrafficData({ trafficDataOption })
  const { transitData, refreshTransitData, errorTransit, transitLoading } = useTransitData({ transitDataOption, operator })

  useEffect(() => {
    getOperators().then(newOperators => setOperators(newOperators))
  }
  , [])

  const handleSubmit = (event) => {
    event.preventDefault()
    refreshTrafficData()
    refreshTransitData()
  }

  const handleTrafficDataOptionChange = () => {
    setTrafficDataOption(!trafficDataOption)
  }

  const handleTransitDataOptionChange = () => {
    setTransitDataOption(!transitDataOption)
  }

  const handleChangeOperator = (evt) => {
    const newOperator = evt.target.value
    setOperator(newOperator)
  }

  return (
    <div className='page'>
      <header className='header-form'>
        <h1>511 Traffic and transit page</h1>
        <form className='search-bar' onSubmit={handleSubmit}>
          <select className='operators-select' onChange={handleChangeOperator} value={operator}>
            <option disabled>Available operators</option>
            {operators
              ? operators.map((operator) => (
                <option key={operator.Id} value={operator.Id}>{operator.Name}</option>
              ))
              : <option>No operators avilable</option>}
          </select>
          <label className='option-item'>
            <input type='checkbox' onChange={handleTrafficDataOptionChange} checked={trafficDataOption} />
            Traffic data
          </label>
          <label className='option-item'>
            <input type='checkbox' onChange={handleTransitDataOptionChange} checked={transitDataOption} />
            Transit Stops data
          </label>
          <button>Search</button>
        </form>
      </header>
      {errorTraffic && <p style={{ color: 'rgb(168, 50, 50)' }}>Traffic data not available</p>}
      {errorTransit && <p style={{ color: 'rgb(168, 50, 50)' }}>Error when getting transit data. Make sure you selected a valid operator</p>}
      <main className='data-grid'>
        <section className='map-container data-row'>
          {
            trafficLoading || transitLoading ? <p>Traffic data loading ...</p> : <Map trafficData={trafficData} transitData={transitData} />
          }
        </section>
        <section className='data-list-container data-row'>
          <span className='traffic-data-title'>Traffic data</span>
          {
            trafficLoading ? <p>Traffic data list loading ...</p> : <InfoList trafficData={trafficData} />
          }
        </section>
      </main>
    </div>

  )
}

export default App

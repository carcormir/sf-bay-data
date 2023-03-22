
import { useState, useEffect } from 'react'
import { getOperators } from '../../services/getOperators'
import { useUpdateData } from '../../hooks/useUpdateData'
import './styles.css'

export default function SearchBar () {
  const [operators, setOperators] = useState([])
  const [operator, setOperator] = useState('')
  const [transitDataOption, setTransitDataOption] = useState(false)
  const [trafficDataOption, setTrafficDataOption] = useState(false)

  const { trafficData, transitData, refreshTrafficData, refreshTransitData } = useUpdateData()

  // retreive the operators when the component updates
  useEffect(() => {
    getOperators().then(newOperators => setOperators(newOperators))
  }
  , [])

  const handleChangeOperator = (evt) => {
    setOperator(evt.target.value)
  }

  // updating search options
  const handleTransitDataOptionChange = () => {
    setTransitDataOption(!transitDataOption)
  }

  const handleTrafficDataOptionChange = () => {
    setTrafficDataOption(!trafficDataOption)
  }

  // handling the search button
  const handleUpdateClick = async () => {
    if (trafficDataOption) refreshTrafficData()
    if (transitDataOption) refreshTransitData()
  }

  return (
    <section className='search-bar'>
      <select className='operators-select' onChange={handleChangeOperator} value={operator}>
        <option disabled>Available operators</option>
        {
          operators.map((operator) => (
            <option key={operator.Id}>{operator.Name}</option>
          ))
        }
      </select>
      <div className='options-container'>
        <label className='option-item'>
          <input
            type='checkbox'
            checked={transitDataOption}
            onChange={handleTransitDataOptionChange}
          />
          Transit Data
        </label>
        <label className='option-item'>
          <input
            type='checkbox'
            checked={trafficDataOption}
            onChange={handleTrafficDataOptionChange}
          />
          Traffic Data
        </label>
      </div>
      <button onClick={handleUpdateClick}>Update Search</button>
    </section>
  )
}

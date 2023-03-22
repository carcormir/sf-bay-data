import React, { useState } from 'react'

const DataContext = React.createContext({

})

export function DataContextProvider ({ children }) {
  const [trafficData, setTrafficData] = useState()
  const [transitData, setTransitData] = useState()

  return (
    <DataContext.Provider value={{ trafficData, setTrafficData, transitData, setTransitData }}>
      {children}
    </DataContext.Provider>
  )
}
export default DataContext

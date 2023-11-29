import React, { useState } from 'react'
import UserContext from './userContext'

const ContextProvider = ({children}) => {
    // Initialize state with data from local storage or an empty array
    const [data, setData] = useState(() => {
      const storedData = localStorage.getItem('userstodo');
      return storedData ? JSON.parse(storedData) : [];
    });
  return (
    <>
    <UserContext.Provider value={{data,setData}}>
        {children}
    </UserContext.Provider>
    </>
  )
}

export default ContextProvider
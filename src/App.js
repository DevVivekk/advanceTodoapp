import React from 'react'
import ContextProvider from './Context/contextProvider'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './comp/Home'
import User from './comp/User'
import './App.scss'
const App = () => {
  return (
    <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:user' element={<User />} />
      </Routes>
    </BrowserRouter>
    </ContextProvider>
  )
}

export default App
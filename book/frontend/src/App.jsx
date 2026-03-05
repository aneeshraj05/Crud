import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import useGetCurrentUser from './hooks/useGetCurrentUser'
export const serverUrl = import.meta.env.VITE_SERVER_URL

const App = () => {
  useGetCurrentUser()
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import { AuthContext } from '../context/AuthContext'

const App = () => {

  const { authUser } = useContext(AuthContext);
  return (
    <div className='bg-[#1c28ac] text-white h-screen w-screen overflow-hidden'>
      <Toaster />
      <Routes>
        <Route path = "/" element = {authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path = "/login" element = {!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path = "/profile" element = {authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
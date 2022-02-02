import React from 'react'
import Map from "./Map";
import UserProfile from "./UserProfile";
import { Routes, Route } from 'react-router-dom'
import Search from './Search'
import Notifications from './Notifications'
import Settings from './Settings'

const OurRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Map />} />
        <Route path='/Search' element={<Search />} />
        <Route path='/Notifications' element={<Notifications />} />
        <Route path='/Settings' element={<Settings />} />
      </Routes>
    </div>
  )
}

export default OurRoutes
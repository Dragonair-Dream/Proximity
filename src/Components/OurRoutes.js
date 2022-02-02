import React from 'react'
import Map from "./Map";
import UserProfile from "./UserProfile";
import { Routes, Route } from 'react-router-dom'
const OurRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Map />} />
      </Routes>
    </div>
  )
}

export default OurRoutes
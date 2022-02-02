import React, { useState, useEffect } from "react";
import { auth } from "./Services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { Routes, Route } from 'react-router-dom'
import BottomTab from "./Components/BottomTab";
import NavBar from "./Components/NavBar";
import UserProfile from "./Components/UserProfile";
import Search from './Components/Search'
import Notifications from './Components/Notifications'
import Settings from './Components/Settings'
import Map from "./Components/Map";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [setUser]);

  if (user) {
    return (
      <div align="center">
        <NavBar />
        <Routes>
          <Route path='/' element={<Map />} />
          <Route path='/Search' element={<Search />} />
          <Route path='/Notifications' element={<Notifications />} />
          <Route path='/Settings' element={<Settings />} />
        </Routes>
        <BottomTab />
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
        </Routes>
      </div>
    )
  }
}

export default App;

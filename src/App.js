import React, { useState, useEffect } from "react";
import Map from "./Components/Map";
import { auth } from "./Services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import BottomTab from "./Components/BottomTab";
import NavBar from "./Components/NavBar";
import UserProfile from "./Components/UserProfile";
import ProfileImage from "./Components/ProfileImage";

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
        {/* <Map /> */}
        <UserProfile />
        {/* <ProfileImage /> */}
        <BottomTab />
      </div>
    );
  }

  return (
    <div>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default App;

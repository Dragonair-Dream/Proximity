import React, { useState, useEffect } from "react";
import Map from "./Components/Map";
import { auth } from "./Services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Logout from "./Components/Logout";
import BottomTab from "./Components/BottomTab";

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

  console.log(user);

  if (user) {
    return (
      <div>
        <Map />
        <Logout />
        <BottomTab />
      </div>
    );
  }

  return (
    <div>
      {/* <SignIn /> */}
      <SignUp />
      <SignIn />
    </div>
  );
};

export default App;

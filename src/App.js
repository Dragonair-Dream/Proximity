import React, { useState, useEffect } from "react";
import { auth } from "./Services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { Routes, Route } from "react-router-dom";
import BottomTab from "./Components/BottomTab";
import NavBar from "./Components/NavBar";
import Chats from "./Components/Chats";
import UserProfile from "./Components/UserProfile";
import Search from "./Components/Search";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";
import Map from "./Components/Map";
import ChatRoom from "./Components/ChatRoom";
import PostEdit from "./Components/PostEdit";

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
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/post-edit" element={<PostEdit />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path='/chats' element={<Chats />} />
          <Route path='/chats/:chatId' element={<ChatRoom />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
        <BottomTab />
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
    );
  }
};

export default App;

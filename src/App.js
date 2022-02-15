import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./Services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { Routes, Route } from "react-router-dom";
import BottomTab from "./Components/BottomTab";
import NavBar from "./Components/NavBar";
import Chats from "./Components/Chats";
import UserProfile from "./Components/UserProfile";
import Profile from "./Components/Profile";
import Search from "./Components/Search";
import Notifications from "./Components/Notifications";
import Settings from "./Components/Settings";
import Map from "./Components/Map";
import ChatRoom from "./Components/ChatRoom";
import PostEdit from "./Components/PostEdit";
import { getRelations } from "./Store/relationsReducer";
import { getAllUsers } from "./Store/usersReducer";
import { getUserData } from "./Store/userProfileReducer";
import PageDoesNotExist from "./Components/PageDoesntExist";

const App = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userProfile);
  //const [currentUserState, setCurrentUserState] = useState(currentUser) || ''

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getRelations());
        dispatch(getAllUsers());
        dispatch(getUserData());
        setUser(user);
      } else {
        /*
      if (currentUser) {
        setCurrentUserState(currentUser)
      } */
        setUser(null);
        //setCurrentUserState('')
      }
    });
  }, [setUser]);
  /*
  if (user && (!currentUserState.didUpdate)) {
    console.log('USER HERE ==============', user)
    console.log('CURRENT HERE +++++++++++', currentUser)
    return (
      <div>
        <Routes>
          <Route path='SignUp' element={}
          <Route path='/' element={<UserProfile/>} />
          <Route path="/userProfile" element={<Profile />} />
        </Routes>
      </div>
    )
  } else */
  if (user) {
    return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route exact path="/SignUp" element={<PageDoesNotExist />} />
          <Route exact path="/post-edit" element={<PostEdit />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/notifications" element={<Notifications />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/chats" element={<Chats />} />
          <Route exact path="/chats/:chatId" element={<ChatRoom />} />
          <Route exact path="/userProfile" element={<Profile />} />
          <Route exact path="/editProfile" element={<UserProfile />} />
          <Route path="/:slug" element={<PageDoesNotExist />} />
        </Routes>
        <BottomTab />
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route path="/:slug" element={<PageDoesNotExist />} />
        </Routes>
      </div>
    );
  }
};

export default App;

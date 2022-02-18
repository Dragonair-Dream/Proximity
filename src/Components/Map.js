import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { googleMapsKey } from "../secrets";
import PostCreate from "./PostCreate";
import { useDispatch, useSelector } from "react-redux";
import { _getUsersPosts } from "../Store/userPostReducer";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db, auth } from "../Services/firebase";
import PostContent from "./PostContent";
import { _getUsersFriendsPosts } from "../Store/friendsPostsReducer";
import { _getUsersFriends } from "../Store/userFriendReducer";

const containerStyle = {
  width: "100%",
  height: "90vh",
  marginBottom: "70px",
};

function Map() {
  const [latitude, setLatitude] = useState(41.25861);
  const [longitude, setLongitude] = useState(-95.93779);
  const [mapError, setMapError] = useState(null);
  const [myPostQueryData, setMyPostQueryData] = useState(null);
  const [allUsersPostQueryData, setAllUsersPostQueryData] = useState([]);
  const usersFriends = useSelector((state) => state.usersFriends);
  const usersData = useSelector(state => state.userProfile)
  const userPhoto = auth.currentUser.photoURL
  const allUsers = useSelector((state) => state.users);
  const dispatch = useDispatch();


  let actualFriendsPosts = [];
  if(Object.keys(usersFriends).length > 0){
    usersFriends.accepted.forEach(friend => {
    let cycle = (allUsersPostQueryData.filter(post => post.postersId === friend.uid))
    let friendsPosts = [];
    if(cycle.length > 0) {
      friendsPosts.push(cycle)
      if(friendsPosts.length > 0) {
        friendsPosts.map(postEl => {
          if(Array.isArray(postEl))
          postEl.forEach(post => actualFriendsPosts.push(post))}
        )}
    }
  })}

  const successPos = (pos) => {
    const { latitude, longitude } = pos.coords;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  useEffect(() => {
    dispatch(_getUsersFriends())
    dispatch(_getUsersPosts());
    dispatch(_getUsersFriendsPosts());
  }, []);

  const onError = (err) => {
    setMapError(err);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setMapError("sorry, Geolocation is not supported by this browser.");
    }
    const watchId = navigator.geolocation.watchPosition(successPos, onError);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const postRef = collection(db, "posts");
    const q = query(postRef, where("postersId", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) =>
        data.push({ docId: doc.id, ...doc.data() })
      );
      setMyPostQueryData(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const q =  query(collection(db, "posts"), where("postersId", "!=", uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postData = []
      querySnapshot.forEach((doc) => {
      postData.push({docId: doc.id,  ...doc.data()});
      })
      setAllUsersPostQueryData(postData)
    });
    return unsubscribe;
  }, [])

  const iconPin = {
    path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    fillColor: "blue",
    fillOpacity: 0.5,
    scale: 0.05,
  };

  if (mapError) {
    return (
      <div>
        {mapError}
      </div>
    );
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={googleMapsKey}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={10}
          options={{ gestureHandling: "cooperative", fullscreenControl: false }}
        >
          <Marker
            position={{ lat: latitude, lng: longitude }}
            icon={iconPin}
            label="me"
          />
          {myPostQueryData &&
            myPostQueryData.map((post) =>
              <div key={post.docId}>
                <PostContent post={post} userPhoto={userPhoto} />
              </div>
            )
          }
          {actualFriendsPosts &&
            actualFriendsPosts.map((post) => (
              <div key={post.docId}>
                <PostContent post={post} users={allUsers} />
              </div>
            ))
          }
          <PostCreate lat={latitude} lng={longitude} />
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(Map);

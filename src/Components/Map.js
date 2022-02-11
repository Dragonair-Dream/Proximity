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
  marginBottom: "17%",
};

function Map() {
  const [latitude, setLatitude] = useState(41.25861);
  const [longitude, setLongitude] = useState(-95.93779);
  const [myPostQueryData, setMyPostQueryData] = useState(null);
  const [allUsersPostQueryData, setAllUsersPostQueryData] = useState([]);
  const usersFriends = useSelector((state) => state.usersFriends);

  let friendsPosts = []
  if(Object.keys(usersFriends).length > 0){
    usersFriends.accepted.forEach(friend => {
    let cycle = (allUsersPostQueryData.filter(post => post.postersId === friend.uid))
    friendsPosts = cycle
  })}

console.log('friedns filter map all userspost ', friendsPosts)

  const dispatch = useDispatch();

  const usersPosts = useSelector((state) => state.usersPosts);
  console.log("-------", usersPosts)

  // const usersFriends = useSelector((state) => state.usersFriends.accepted);
  console.log("-------Fr", usersFriends);

  const usersFriendsPosts = useSelector((state) => state.friendsPosts);
  console.log("-------friends posts stuff", usersFriendsPosts);

  const successPos = (pos) => {
    const { latitude, longitude } = pos.coords;
    setLatitude(latitude);
    setLongitude(longitude);
    // console.log("Your current position is:");
    // console.log(`Latitude : ${latitude}`);
    // console.log(`Longitude: ${longitude}`);
  };

  useEffect(() => {
    let watchId;
    dispatch(_getUsersFriends())
    dispatch(_getUsersPosts()); // is this the leak???
    dispatch(_getUsersFriendsPosts());
    if (navigator.geolocation) {
      watchId = navigator.geolocation.getCurrentPosition(successPos);
    } else {
      alert("sorry, Geolocation is not supported by this browser.");
    }
    return watchId;
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
    scale: 0.05, //to reduce the size of icons
  };

  return (
    <>
      {/* <button onClick={getPosition}>position</button> */}
      <LoadScript //Loads the Google Maps API script.(API) interfaces between an application and scripting language. It provides the connection points with the application that allow you to control it
        googleMapsApiKey={googleMapsKey}
      >
        <GoogleMap //GoogleMap - The map component inside which all other components render
          mapContainerStyle={containerStyle}
          center={{ lat: latitude, lng: longitude }}
          zoom={5}
          options={{ gestureHandling: "cooperative", fullscreenControl: false }}
        >
          <Marker
            position={{ lat: latitude, lng: longitude }}
            icon={iconPin}
            label="me"
            // onClick={()=> {setSelectedMarker(jerry.post.id)}}
          />
          {myPostQueryData &&
            myPostQueryData.map((post) => <PostContent post={post} />)
          }
          {friendsPosts &&
            friendsPosts.map((post) => (
              <PostContent post={post} />
            ))
          }
          <PostCreate lat={latitude} lng={longitude} />
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default React.memo(Map); //Using memo will cause React to skip rendering a component if its props have not changed.

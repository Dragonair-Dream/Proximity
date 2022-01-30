import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '900px'
};






const imageUrl = "https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"

function Map() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [latitude, setLatitude] = useState( 41.25861)
  const [longitude, setLongitude] = useState( -95.93779)

    const getPosition = useCallback(() => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successPos)
      } else {
        alert("sorry, Geolocation is not supported by this browser.")
      }
    }, [])

    const successPos = (pos) => {
      const {latitude, longitude} = pos.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      console.log('Your current position is:');
      console.log(`Latitude : ${latitude}`);
      console.log(`Longitude: ${longitude}`);
    }

console.log('---latsssss-', latitude)
useEffect(() => {getPosition()}, [getPosition])



  return (
    <>
    {/* <button onClick={getPosition}>position</button> */}
    <LoadScript
      googleMapsApiKey= "AIzaSyDjD4lGFnY7plUA4lmRqm7k5GOxRWbPwtY"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: latitude, lng: longitude}}
        zoom={10}
      >
        <Marker //at some point we will use map to go through the locations of friends to create marker for each
        position={{lat: latitude, lng: longitude}}
        onClick={()=> {setSelectedFriend('jerrrrry')}}
        />
         {selectedFriend ? (
          <InfoWindow position={{lat: latitude, lng: longitude}} onCloseClick={()=>{setSelectedFriend(null);}} > 
          <div>
            <img src={imageUrl} alt="" width="200px" height="auto"/>
            <h3>Jacopo is at<a href=''>"joes Pizza"</a> </h3>
            <p>Having a blast, haha get it? cause it's a laser tag place. <br/> 
            Come join if your in the area. Be here till 7pm.</p>
            <button>CHAT</button>
          </div>
          </InfoWindow>) : (<></>)}


        { /* Child components, such as markers, info windows, etc. */ }
      </GoogleMap>
    </LoadScript>
    <footer> </footer>
    </>
  )
}

export default React.memo(Map) //Using memo will cause React to skip rendering a component if its props have not changed.



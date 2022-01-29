import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '900px'
};

const center = {
  lat: 41.25861,
  lng: -95.93779
};

const imageUrl = "https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"

function Map() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  return (
    <>
    <LoadScript
      googleMapsApiKey= "AIzaSyDjD4lGFnY7plUA4lmRqm7k5GOxRWbPwtY"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker //at some point we will use map to go through the locations of friends to create marker for each
        position={center}
        onClick={()=> {setSelectedFriend('jerrrrry')}}
        />
         {selectedFriend ? (
          <InfoWindow position={center} onCloseClick={()=>{setSelectedFriend(null);}} > 
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



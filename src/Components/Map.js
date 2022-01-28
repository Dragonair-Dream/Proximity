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
            <h3>Users Post</h3>
            <img src="prox-logo-city.png" alt="" width="75px" height="auto"/>
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



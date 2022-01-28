import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '900px'
};

const center = {
  lat: 41.25861,
  lng: -95.93779
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey= "AIzaSyDjD4lGFnY7plUA4lmRqm7k5GOxRWbPwtY"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map) //Using memo will cause React to skip rendering a component if its props have not changed.



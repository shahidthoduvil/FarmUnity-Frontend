import React from 'react';
import mapUrl from '../../../images/map.jpg';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';



const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};


const MapLocation = () => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyASHsdk2nsNZcR8iprzHqy4FfyRQS3RmSY"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


 
  return (<div style={{position:'relative'}}>
    <div style={{position:'absolute',top:10,left:10,backgroundColor:"orange",padding:25}}>


    </div>
  

  
  { isLoaded ? 
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      : <></>
  }
  </div>

  );

};

export default MapLocation;

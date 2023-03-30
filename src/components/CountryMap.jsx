import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
const libraries = ['places'];

const CountryMap = ({latlng}) => {
    const { isLoaded,loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
      })
  
    
  const centers = useMemo(() => ({lat:latlng[0],lng:latlng[1]}),[]);


  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div><Spinner variant='info'></Spinner> Loading Google Maps API...</div>;
  console.log(centers)
  return (
    <>
    <GoogleMap zoom={4} center={{ centers }} mapContainerStyle={{"width":"98%", "height":"100vh"}}>
  <Marker position={{ centers}} />
</GoogleMap>

    </>
    // <GoogleMap center={center} zoom={zoom}>
    //   <Marker position={center} />
    // </GoogleMap>
  );
}

export default CountryMap;



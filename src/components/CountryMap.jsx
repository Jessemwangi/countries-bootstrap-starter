import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useMemo } from 'react';
import { Spinner } from 'react-bootstrap';
const libraries = ['places'];

const CountryMap = ({latlng}) => {
    const { isLoaded,loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
      })
  
    
  const centers = useMemo(() => ({lat:latlng[0],lng:latlng[1]}),[latlng]);


  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div><Spinner variant='info'></Spinner> Loading Google Maps API...</div>;

  return (
    <>
    <GoogleMap zoom={6} center={centers} mapContainerStyle={{"width":"98%", "height":"40vh"}}>
  <Marker position={centers} />
</GoogleMap>

    </>

  );
}

export default CountryMap;



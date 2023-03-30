import React from 'react';

//   import { FaLocationArrow, FaTimes } from 'react-icons/fa'

  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api'
  import { useRef, useState } from 'react'
import { Button, ButtonGroup, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';

  const center = { lat: 60.2017, lng: 24.9359 }
  const libraries = ['places'];
  const HomeDirection = () => {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
    })

    const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const originRef = useRef()
    const destiantionRef = useRef()

    if (!isLoaded) {
      return <Spinner />
    }

    async function calculateRoute() {
      if (originRef.current.value === '' || destiantionRef.current.value === '') {
        return
      }
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService()
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirectionsResponse(results)
      setDistance(results.routes[0].legs[0].distance.text)
      setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      originRef.current.value = ''
      destiantionRef.current.value = ''
    }
    const tooltip = ( tipBold = "", tiplignt="") =>{

        return(
        <Tooltip id="tooltip">
          <strong>{tipBold} !</strong> {tiplignt}.
        </Tooltip>
      );
    }

    return (


        <Container fluid className="vh-100 vw-100 position-relative">
          <div className="position-absolute top-0 left-0 h-100 w-100">
            {/* Google Map Box */}
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={map => setMap(map)}
            >
              <Marker position={center} />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </div>
          <div className="p-4 border rounded-lg m-4 bg-white shadow min-w-md position-relative zindex-1">
            <Row
             className="mb-4">
              <Col>
                <InputGroup>
                <Autocomplete>
                  <FormControl placeholder="Origin" ref={originRef} />
                  </Autocomplete>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                <Autocomplete>
                  <FormControl placeholder="Destination" ref={destiantionRef} />
                </Autocomplete>
                </InputGroup>
              </Col>
              <Col>
                <ButtonGroup>
                <OverlayTrigger placement="bottom" overlay={tooltip("Show","Routes and Distance")}>
                  <Button className='btn btn-primary' onClick={calculateRoute}>
                    Calculate  <i className="bi bi-airplane-engines-fill"></i> Route
                  </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="right" overlay={tooltip("Clear","current locations")}>
                  <Button className='btn btn-danger border' onClick={clearRoute}>
                  <i className=" bi bi-x-octagon-fill"></i>
                    {/* <FaTimes /> */}
                  </Button>
                  </OverlayTrigger>
                </ButtonGroup>
              </Col>
            </Row>
            <Row className="justify-content-between">
              <Col>
                <p>Distance: {distance} </p>
                <p>Duration: {duration} </p>
              </Col>
              <Col>
              <OverlayTrigger placement="bottom" overlay={tooltip("Reset","Pin position to original")}>
                <Button variant="danger" onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
                }}>
                    <i className="bi bi-geo-fill"></i>
                  {/* <FaLocationArrow /> */}
                </Button>
                </OverlayTrigger>
              </Col>
            </Row>
          </div>
        </Container>

    )
  }

  export default HomeDirection;
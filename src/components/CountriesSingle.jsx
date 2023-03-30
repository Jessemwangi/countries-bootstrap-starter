import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { Col, Container, Image, Row, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'

const CountriesSingle = () => {
  const country = useLocation()
const [countryName,] =useState(country.state.country.name.common)
const [neighbors,setNeighbors] =useState([])

const [loading,setLoading]=useState(true)
const [error,SetError] = useState()

  const [weather,setWeather] = useState();
  const baseUrl = `https://restcountries.com/v3.1/alpha?codes=${country.state.neighbors.join(',')}`

  useEffect(() =>{
    const fetchNeighborNames = async () =>{
const {data} = await axios.get(baseUrl);
setNeighbors(()=> data.map(country => country.name.common))
    }
   fetchNeighborNames()
  },[baseUrl])

  console.log(neighbors)
  useEffect( () => {
    setLoading(true)
 const fetchCountryWeather = async () =>{

      try {
	const apiKey =process.env.REACT_APP_OPENWEATHER_KEY
	      const {data} =  await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=metric&appid=${apiKey}`)
	    setWeather(data);
      setLoading(false)
      
} catch (error) {
	SetError(error)
}
    }
    fetchCountryWeather()

  }, [countryName])
  return (
    
      loading ? (
       <Container fluid>
       <Col className="mt-5 text-center">
         <Spinner animation="border" variant="info" />
         </Col>
         </Container>
         ):(
    <Container>

      <h1>{country.state.country.name.common}</h1>
      <Row>
        <Col>
        <Image thumbnail src={`https://source.unsplash.com/500x500/?${country.state.country.name.common}`} alt={country.state.country.name.common}/>
      
        </Col>
      
      
        {weather  && !error && 
        <Col>
        <h2>{country.state.country.name.common}</h2>
        right now it is : <strong>{weather.main.temp} °C</strong> 
        <p>Cities: <strong>{(country.state.country.capital).join(', ')}</strong></p>
        <Row>
<Col>
        <Image thumbnail src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={country.state.country.name.common}/>
</Col>
        </Row>
        
      
          
        </Col>}
        
      </Row>
    </Container>)
  );
};

export default CountriesSingle;

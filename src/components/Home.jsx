import React from 'react';
import HomeDirection from './HomeDirection';
import { Col, Container, Row } from 'react-bootstrap';


const Home = () => {
  return (

    <Container fluid >
      <Row className='p-2 bg-dark border' style={{"color":"#978f8f"}}>
        <Col>
        <h2>Enter source and destination to see route and calculate the distance.</h2>
        </Col>
        <Col>
        <span>Countries app </span>is a simple React application made in
        Business College Helsinki lessons. App uses{' '}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a>
        </Col>

      </Row>
      <Row className='p-1 bg-primary'></Row>
      <HomeDirection/>

                
    </Container>

  );
};

export default Home;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const CountriesSingle = () => {
  const location = useLocation();
  const country = location.state.country;

  const navigate = useNavigate();

  return (
    <Container>
      <Row className="m-5">
        <Col>
          {' '}
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${country.capital}`}
          ></Image>
        </Col>
        <Col>
          <h2 className="display-4">{country.name.common}</h2>

          <h3>{country.capital}</h3>
        </Col>
      </Row>
      <Row className="m-5">
        <Col>
          <Button variant="light" onClick={() => navigate('/countries')}>
            Back to countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;

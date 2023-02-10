import React, { useEffect, useState } from 'react';


import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { initializeCountries } from '../features/contriesSlice';
import { Button, Image } from 'react-bootstrap';
import { clearfavourite, removeFromFav } from '../features/ProfileSlice';


const Favourite = () => {
  const [search, setSearch] = useState('')
const [favouritesList, setFavouritesList] = useState([]);
  const dispatch = useDispatch();
  let countryList = useSelector(state => state.countries.countries)  // state.countries ( this is store).countries(this is slice   initialState: {countries: [],},)
  const isLoading = useSelector(state => state.countries.isLoading)


  console.log(isLoading)
 
  if(favouritesList !==  null){
    countryList = countryList.filter(country => favouritesList.includes(country.name.common))
  }
  else{
    countryList=[];
  }
 useEffect(() => {
  
 dispatch(initializeCountries())
 setFavouritesList(localStorage.getItem('favCountries'))

 }, [dispatch])

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        <Button variant='danger' className='p-3' onClick={()=>{
            dispatch(clearfavourite())
        }}> Clear All</Button>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {
       isLoading ? (
        <Container fluid>
        <Col className="mt-5 text-center">
          <Spinner animation="border" variant="info" />
          </Col>
          </Container>
          ):(
          
        
          countryList.filter(cntry =>{
            return (cntry.name.official.toLowerCase())
            .includes(search.toLocaleLowerCase()) || 
            (cntry.name.common.toLowerCase())
            .includes(search.toLocaleLowerCase()) 
          }).map(country =>(

            <Col className="mt-5" key={country.name.common}>
              {/* <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ country: country }}
              > */}
                <Card className="h-100">
                  <i className='bi bi-heart-fill text-danger m-1 p-1' onClick={
                    () =>{
                        console.log(country.name.common)
                      dispatch(removeFromFav(country.name.common))
                    }
                    }/>

                  <Card.Body className="d-flex flex-column">
                    <Card.Img className='mb-4' src={country.flags.svg} alt={country.name.common} />
                    <Card.Title>{country.name.common}</Card.Title>
                    <Card.Subtitle className="mb-5 text-muted">
                      {country.name.official}
                    </Card.Subtitle>
                    <ListGroup
                      variant="flush"
                      className="flex-grow-1 justify-content-end"
                    >
                      <ListGroup.Item>
                        <i className="bi bi-translate me-2">   
                          
                          </i>
                         {country.languages ? Object.values(country.languages).map(lang => lang).join(', ') : '.....'}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <i className="bi bi-cash-coin me-2">
                        </i>
                         {country.currencies ? (Object.values(country.currencies)).map(currency => currency.name).join(', '): '......'
                      } 
                        
                      </ListGroup.Item>
                    
                      <ListGroup.Item>
                        <i className="bi bi-people me-2"> </i>{(country.population).toLocaleString()}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              {/* </LinkContainer> */}
            </Col>
          ))
       )
          }
        
      </Row>
    </Container>
  );
};

export default Favourite;

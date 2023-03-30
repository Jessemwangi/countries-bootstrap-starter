import React, { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { initializeCountries } from '../features/contriesSlice';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { clearfavourite, removeFromFav } from '../features/ProfileSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/Firebase';
import { useNavigate } from 'react-router-dom';


const Favourite = () => {
  const [user] = useAuthState(auth);
  const [search, setSearch] = useState('')
const [favouritesList, setFavouritesList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let favourites = useSelector(state => state.favourite.favCountries) 

useEffect(()=>{
  if(!user) {navigate('/login')}
  else{
    setFavouritesList(()=>favourites.filter(fav => fav.userId === user.uid))
  }

},[favourites, navigate, user])
  let countryList = useSelector(state => state.countries.countries)  // state.countries ( this is store).countries(this is slice   initialState: {countries: [],},)
  const isLoading = useSelector(state => state.countries.isLoading)
 
  if(favouritesList !==  null){
    countryList = countryList.filter(country => favouritesList.map(fav =>fav.name).includes(country.name.common))
  }
  else{
    countryList=[];
  }
 useEffect(() => {
 
 dispatch(initializeCountries())

 }, [dispatch,])

 const tooltip = (
  <Tooltip id="tooltip">
    <strong>Remove !</strong> from favourite.
  </Tooltip>
);
  return (
    
    <Container fluid>

{isLoading ? (
      <Container fluid>
        <h1>loading your favourite....</h1>
            <Col className="mt-5 text-center">
              <Spinner animation="border" variant="info" />
            </Col>
          </Container>
    ):(
<>
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
                <Card className="h-100">
                <OverlayTrigger placement="left" overlay={tooltip}>
  
                  <i className="bi bi-trash3-fill text-danger m-1 p-1" style={{"cursor":"pointer"}}
                    onClick={
                    () =>{
                      dispatch(removeFromFav(country.name.common))
                    }
                    }/></OverlayTrigger>
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
            </Col>
          ))
       )
          }
        
      </Row>
      </>
       )}
    </Container>
   
  );
};

export default Favourite;

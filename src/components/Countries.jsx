import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { initializeCountries } from "../features/contriesSlice";
import { addToFavourite } from "../features/ProfileSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/Firebase";

const Countries = () => {
  let favouritesList = useSelector((state) => state.favourite.favCountries);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  let countryList = useSelector((state) => state.countries.countries); // state.countries ( this is store).countries(this is slice   initialState: {countries: [],},)
  const isLoading = useSelector((state) => state.countries.isLoading);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

 

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
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
        {isLoading ? (
          <Container fluid>
            <Col className="mt-5 text-center">
              <Spinner animation="border" variant="info" />
            </Col>
          </Container>
        ) : (
          countryList
            .filter((cntry) => {
              return (
                cntry.name.official
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                cntry.name.common
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase())
              );
            })
            .map((country) => (
              <Col className="mt-5" key={country.name.common}>
                <Card className="h-100">
                  {favouritesList
                    .filter((fav) => fav.userId === user.uid)
                    .map((countryName) => countryName.name)
                    .includes(country.name.common) ? (
                    <>
                      <i className="bi bi-check-lg" style={{ color: "green" }}>
                        {" "}
                        Added to Favourite
                      </i>
                    </>
                  ) : (
                    <i
                      style={{ cursor: "pointer" }}
                      className="bi bi-heart-fill text-danger m-1 p-1"
                      onClick={() => {
                        let favCountry = {
                          name: country.name.common,
                          userEmail: user.email,
                          userId: user.uid,
                        };
                        dispatch(addToFavourite(favCountry));
                      }}
                    />
                  )}
                  <LinkContainer
                    style={{ cursor: "pointer" }}
                    to={`/countries/${country.name.common}`}
                    state={{
                      country: country,
                      neighbors: country.borders,
                    }}
                  >
                    <Card.Body className="d-flex flex-column">
                      <Card.Img
                        className="mb-4"
                        src={country.flags.svg}
                        alt={country.name.common}
                      />
                      <Card.Title>{country.name.common}</Card.Title>
                      <Card.Subtitle className="mb-5 text-muted">
                        {country.name.official}
                      </Card.Subtitle>
                      <ListGroup
                        variant="flush"
                        className="flex-grow-1 justify-content-end">
                        <ListGroup.Item>
                          <i className="bi bi-translate me-2"></i>
                          {country.languages
                            ? Object.values(country.languages)
                                .map((lang) => lang)
                                .join(", ")
                            : "....."}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="bi bi-cash-coin me-2"></i>
                          {country.currencies
                            ? Object.values(country.currencies)
                                .map((currency) => currency.name)
                                .join(", ")
                            : "......"}
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <i className="bi bi-people me-2"> </i>
                          {country.population.toLocaleString()}
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </LinkContainer>
                </Card>
                {/* */}
              </Col>
            ))
        )}
      </Row>
    </Container>
  );
};

export default Countries;

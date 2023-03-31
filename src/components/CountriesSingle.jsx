import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CountryMap from "./CountryMap";

const CountriesSingle = () => {
  const country = useLocation();
  const [countryName] = useState(country.state.country.name.common);
  const [neighbors, setNeighbors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState();

  const [weather, setWeather] = useState();
  const baseUrl = `https://restcountries.com/v3.1/alpha?codes=`;
  const randomColor = [
    "primary",
    "danger",
    "info",
    "warning",
    "light",
    "success",
    "secondary",
  ];
  useEffect(() => {
    const fetchNeighborNames = async () => {
      if (country.state.neighbors.length > 0) {
        const { data } = await axios.get(
          `${baseUrl}${country.state.neighbors.join(",")}`
        );
        setNeighbors(() => data.map((country) => country.name.common));
      }
    };
    fetchNeighborNames();
  }, [baseUrl]);

  useEffect(() => {
    setLoading(true);
    const fetchCountryWeather = async () => {
      try {
        const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=metric&appid=${apiKey}`
        );
        setWeather(data);
        setLoading(false);
      } catch (error) {
        SetError(error);
      }
    };
    fetchCountryWeather();
  }, [countryName]);
  console.log(country.state.country);
  return loading ? (
    <Container fluid>
      <Col className="mt-5 text-center">
        <Spinner animation="border" variant="info" />
      </Col>
    </Container>
  ) : (
    <Container>
      <h1>
        {country.state.country.name.common} {country.state.country.flag}
      </h1>
      <Row>
        <Col className="col-4">
          <Image
            thumbnail
            src={`https://source.unsplash.com/500x500/?${country.state.country.name.common}`}
            alt={country.state.country.name.common}
          />
        </Col>

        {weather && !error && (
          <Col>
            Right now it is : <strong>{weather.main.temp} °C</strong>
            <p>
              Cities:{" "}
              <strong>{country.state.country.capital.join(", ")}</strong>
            </p>
            <Row>
              <Col className="center">
                <Image
                  thumbnail
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={country.state.country.name.common}
                />
              </Col>
            </Row>
            <Row className="border mt-3">
              {/* <Row className="p-3 m-3 mt-6 rounded bg-dark text-white text-center col-11">
              <Col >Border Countries</Col>
            </Row> */}
              <Row>
                {neighbors.length > 0 ? (
                  neighbors.map((neigbor) => (
                    <Col
                      key={neigbor}
                      className={`bg-${
                        randomColor[
                          Math.floor(Math.random() * randomColor.length)
                        ]
                      } border p-2 m-2 text-center`}
                    >
                      {neigbor}
                    </Col>
                  ))
                ) : (
                  <Col className="border p-2 m-2 text-center bg-light">
                    No Neighbours Found
                  </Col>
                )}

                <Row className="p-3 bg-light mt-3 mb-4 text-black text-center col-12 center">
                  <Col>
                    <h2>More About {country.state.country.name.common}</h2>
                  </Col>
                  <Row>
                    <Col>
                      Capital city : {country.state.country.capital.join(" , ")}
                    </Col>
                    <Col>
                      Population : {country.state.country.population.toString()}
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </Row>
              </Row>
            </Row>
          </Col>
        )}
      </Row>

      <Row>
        <Col className="col-12 center">
          <CountryMap latlng={country.state.country.latlng} />
        </Col>
      </Row>
      <Container></Container>
    </Container>
  );
};

export default CountriesSingle;

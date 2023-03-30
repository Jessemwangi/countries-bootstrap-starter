import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Countries from "./components/Countries";
import CountriesSingle from "./components/CountriesSingle";
import Home from "./components/Home";
import Layout from "./pages/Layout";

import "bootstrap-icons/font/bootstrap-icons.css";
import Favourite from "./components/Favourite";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import 'react-toastify/dist/ReactToastify.css';
import CountryMap from "./components/CountryMap";

const App = () => {
  // useJsApiLoader({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  // });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/map" element={<CountryMap/>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/countries" element={<Countries />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/countries/:single" element={<CountriesSingle />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

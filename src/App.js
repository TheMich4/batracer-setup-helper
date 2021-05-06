/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Navbar, WeatherSetupConverter, RaceCard } from "./components";

const App = (props) => (
  <div className="App">
    <Navbar />
    <RaceCard />
  </div>
);

export default App;

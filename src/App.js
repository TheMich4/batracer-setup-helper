/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Navbar, WeatherSetupConverter } from "./components";
import { increaseCounter, decreaseCounter } from "./redux/Counter/counter.actions";

const App = (props) => (
  <div className="App">
    <Navbar />
    {/* <div>Count: {props.count}</div>

    <button
      onClick={() => {
        console.log("i");
        props.increaseCounter();
      }}
    >
      Increase Count
    </button>

    <button onClick={() => props.decreaseCounter()}>Decrease Count</button> */}
    <WeatherSetupConverter />
  </div>
);

const mapStateToProps = (state) => ({
  count: state.counter.count,
});

const mapDispatchToProps = (dispatch) => ({
  increaseCounter: () => dispatch(increaseCounter()),
  decreaseCounter: () => dispatch(decreaseCounter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

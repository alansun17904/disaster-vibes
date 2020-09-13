import React, { Component } from "react";
// import NavBar from "./components/NavBar";
import { Route } from "react-router-dom";
import IndexPage from "./components";
import Insured from "./components/Insured";
import Insurer from "./components/Insurer";

class App extends Component {
  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={props => (
            <IndexPage />
          )}
        />
        <Route
          path="/insured"
          exact
          render={props => (
            <Insured  />
          )}
        />
        <Route
          path="/insurer"
          exact
          render={props => (
            <Insurer />
          )}
        />
      </div>
    );
  }
}

export default App;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

import Layout from "./@layouts/Layout";
import Home from "@modules/Home/Home";
import Login from "@modules/Login/Login";
import Signup from "@modules/Signup/Signup";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Layout>{/* <All app Modals /> */}</Layout>
      </Switch>
    </Router>
  );
}

export default App;

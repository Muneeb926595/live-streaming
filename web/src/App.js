import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./@layouts/Layout";
import Home from "@modules/Home/Home";
import Streams from "@modules/Streams/Streams";
import Login from "@modules/Login/Login";
import Signup from "@modules/Signup/Signup";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Layout>
            <Route exact path="/live-streams" component={Streams} />
            <Route exact path="/streaming" component={Home} />
          </Layout>
        </Switch>
      </Router>
    </>
  );
}

export default App;

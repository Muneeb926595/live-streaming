import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./@layouts/Layout";
import Streams from "@modules/Streams/Streams";
import HostStreaming from "@modules/HostStreaming/HostStreaming";
import GuestStreaming from "@modules/GuestStreaming/GuestStreaming";
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
            <Route exact path="/host-streaming" component={HostStreaming} />
            <Route exact path="/guest-streaming" component={GuestStreaming} />
          </Layout>
        </Switch>
      </Router>
    </>
  );
}

export default App;

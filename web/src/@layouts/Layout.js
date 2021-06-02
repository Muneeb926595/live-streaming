import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { socket } from "@helpers/sockets";

const Layout = (props) => {
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      socket.emit("join", localStorage.getItem("userId"));
    }
    return () => {
      socket.off("join");
    };
  }, []);
  if (
    !(localStorage.getItem("access_token") && localStorage.getItem("userId"))
  ) {
    return <Redirect to="/" />;
  }
  return <div>{props.children}</div>;
};

export default Layout;

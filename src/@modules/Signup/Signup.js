import { toast } from "react-toastify";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Col, Icon, Row, Text, Input, Button } from "@components";
import { submitRegister } from "@store/auth/AuthActions";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValidation =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSignup = (username, email, password) => {
    if (username === "" || username?.length < 5) {
      return toast.error("Username must be 5 characters long");
    } else if (!emailValidation.test(String(email).toLowerCase())) {
      return toast.error("Email is Invalid!");
    } else if (password?.length < 6) {
      return toast.error("Password must be 6 characters long");
    } else {
      dispatch(submitRegister(username, email, password, history));
    }
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(150deg, rgba(70,69,69,1) 0%, rgba(0,0,0,1) 88%)",
      }}
    >
      <Col ht="100%" wid="100%" centerAll>
        <Row noFlex>
          <Icon type="logo" size="200px" />
        </Row>
        <Row noFlex marg="0 0 4rem 0">
          <Text
            color="#ffffff"
            size="28px"
            weight="bold"
            marg="0.4rem 0 0 0.8rem"
          >
            Welcome to Streamlia
          </Text>
        </Row>
        <Col noFlex wid="20rem">
          <Row noFlex marg="0 0 1rem 0">
            {/* <Input
              placeholder={"Username"}
              onChange={(event) => {
                setUsername(event.nativeEvent.text);
              }}
              bg="#222222"
            /> */}
            <input
              placeholder={"Username"}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              style={{
                width: "100%",
                background: "#222222",
                outline: "none",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "6px",
                color: "#bfbfbf",
              }}
            />
          </Row>
          <Row noFlex marg="0 0 1rem 0">
            {/* <Input
              placeholder={"Email"}
              onChange={(event) => {
                setEmail(event.nativeEvent.text);
              }}
              bg="#222222"
            /> */}
            <input
              placeholder={"Email"}
              value={email}
              style={{
                width: "100%",
                background: "#222222",
                outline: "none",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "6px",
                color: "#bfbfbf",
              }}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Row>
          <Row noFlex>
            {/* <Input
              placeholder={"Password"}
              onChange={(event) => {
                setPassword(event.nativeEvent.text);
              }}
              bg="#222222"
            /> */}
            <input
              placeholder={"Password"}
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              style={{
                width: "100%",
                background: "#222222",
                outline: "none",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "6px",
                color: "#bfbfbf",
              }}
            />
          </Row>
        </Col>
        <Row noFlex marg="1rem 0 4rem 0">
          <Text
            color="#ffffff"
            size="12px"
            weight="400"
            marg="0.4rem 0 0 0.8rem"
          >
            Already have an account ?{" "}
            <span
              onClick={() => history.push("/")}
              style={{ color: "#0b67ff", cursor: "pointer", fontWeight: "700" }}
            >
              SignIn
            </span>
          </Text>
        </Row>
        <Row noFlex>
          <Button
            border="none"
            hasRadius="6px"
            bgColor="#0b67ff"
            text="Sign Up"
            wid="20rem"
            color="#ffffff"
            size="12px"
            weight="bold"
            marg="0.4rem 0 0 0.8rem"
            onClick={() => handleSignup(username, email, password)}
          />
        </Row>
      </Col>
    </div>
  );
};

export default Signup;

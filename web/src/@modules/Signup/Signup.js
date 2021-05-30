import React from "react";
import { useHistory } from "react-router-dom";

import { Col, Icon, Row, Text, Input, Button } from "@components";

const Signup = () => {
  const history = useHistory();
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
            <Input bg="#222222" />
          </Row>
          <Row noFlex marg="0 0 1rem 0">
            <Input bg="#222222" />
          </Row>
          <Row noFlex>
            <Input bg="#222222" />
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
          />
        </Row>
      </Col>
    </div>
  );
};

export default Signup;

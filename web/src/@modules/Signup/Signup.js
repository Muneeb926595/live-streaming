import React from "react";

import { Col, Row, Text } from "@components";

const Signup = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(150deg, rgba(70,69,69,1) 0%, rgba(0,0,0,1) 88%)",
      }}
    >
      <Col ht="100%" centerAll>
        <Row noFlex>
          <Text
            color="#ffffff"
            size="12px"
            weight="bold"
            marg="0.4rem 0 0 0.8rem"
          >
            Logo Goes here
          </Text>
        </Row>
        <Row noFlex>
          <Text
            color="#ffffff"
            size="12px"
            weight="bold"
            marg="0.4rem 0 0 0.8rem"
          >
            Welcome Message
          </Text>
        </Row>
        <Row noFlex>
          <Text
            color="#ffffff"
            size="12px"
            weight="bold"
            marg="0.4rem 0 0 0.8rem"
          >
            Input Field
          </Text>
        </Row>
        <Row noFlex>
          <Text
            color="#ffffff"
            size="12px"
            weight="bold"
            marg="0.4rem 0 0 0.8rem"
          >
            Signup Button
          </Text>
        </Row>
      </Col>
    </div>
  );
};

export default Signup;

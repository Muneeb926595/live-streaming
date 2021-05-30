import React from "react";

import { Watchers, Chat, Header, Camera, StreamingStatus } from "./components";
import { Row, Col } from "@components";

const Home = () => {
  return (
    <Row marg="2rem 0 0 0" pad="2rem" ht="94vh">
      <Col bg="#1f1f1f" noFlex wid="16%" hasRadius="10px">
        <Watchers />
      </Col>
      <Col bg="#1f1f1f" marg="0 1.4rem" hasRadius="10px">
        <Camera />
      </Col>
      <Col noFlex wid="20%">
        <Row marg="0 0 1rem 0" bg="#1f1f1f" hasRadius="10px">
          <StreamingStatus />
        </Row>
        <Row bg="#1f1f1f" hasRadius="10px">
          <Chat />
        </Row>
      </Col>
    </Row>
  );
};

export default Home;

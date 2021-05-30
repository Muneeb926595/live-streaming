import React from "react";

import { Row, Text, Col, Box } from "@components";

const Chat = () => {
  return (
    <Box wid="100%">
      <Row noFlex wid="100%" between center bg="#373737" pad="0 1rem">
        <Text color="#ffffff" size="12px" weight="bold">
          Chat
        </Text>
        <Row></Row>
      </Row>
      <Col pad="0 2rem"></Col>
    </Box>
  );
};

export default Chat;

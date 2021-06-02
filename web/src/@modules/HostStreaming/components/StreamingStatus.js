import React from "react";

import { Row, Text, Col, Box, Icon, Clickable } from "@components";

const StreamingStatus = () => {
  return (
    <Box>
      <Row noFlex wid="100%" between center bg="#373737" pad="0 1rem">
        <Text color="#ffffff" size="12px" weight="bold">
          Audio & Video
        </Text>
        <Row></Row>
      </Row>
      <Col pad="2rem">
        <Text center color="#ffffff" size="16px" weight="bold">
          Active Streaming...
        </Text>
        <Text center color="#848388" size="14px" weight="400">
          Successfully connected to media server
        </Text>
        <Text center color="#848388" size="14px" weight="400">
          Please make sure you have permitted access to your camera and
          microphone
        </Text>
        <Row centerAll marg="1rem 0 0 0">
          <Clickable>
            <Box
              bg="#e3c255"
              hasRadius="100%"
              pad="6px 8px"
              marg="0 1rem 0 0"
              centerAll
            >
              <Icon type="micro-phone" width="22px" height="20px" />
            </Box>
          </Clickable>
          <Clickable>
            <Box bg="#e3c255" hasRadius="100%" pad="6px 8px" centerAll>
              <Icon type="camera" width="22px" height="20px" />
            </Box>
          </Clickable>
        </Row>
      </Col>
    </Box>
  );
};

export default StreamingStatus;

import React from "react";

import { Box, Row, Col, Text } from "@components";
import CameraOptions from "./CameraOptions";

const Camera = () => {
  return (
    <Box wid="100%">
      <Row noFlex wid="100%" between center bg="#373737" pad="0 1rem">
        <Text color="#ffffff" size="12px" weight="bold">
          Host Stream
        </Text>
        <Row></Row>
      </Row>
      <Col pad="0 2rem">
        <Box wid="100%"></Box>
        <Box
          absolute
          bottom="10%"
          left="35%"
          wid="24%"
          pad="20px"
          hasRadius="10px"
          bg="#212629"
          border="1px solid #383838"
        >
          <CameraOptions />
        </Box>
      </Col>
    </Box>
  );
};

export default Camera;

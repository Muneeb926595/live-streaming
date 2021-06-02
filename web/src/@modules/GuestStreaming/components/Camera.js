import React, { useRef } from "react";

import { Box, Row, Col, Text } from "@components";
import CameraOptions from "./CameraOptions";

const Camera = ({ videoRef }) => {
  return (
    <Box wid="100%">
      <Row noFlex wid="100%" between center bg="#373737" pad="0 1rem">
        <Text color="#ffffff" size="12px" weight="bold">
          Host Stream
        </Text>
        <Row></Row>
      </Row>
      <Col noFlex>
        <Box wid="100%">
          <video autoPlay={true} ref={videoRef} />
        </Box>
      </Col>
    </Box>
  );
};

export default Camera;

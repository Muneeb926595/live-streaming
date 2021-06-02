import React from "react";

import { Box, Row, Col, Text } from "@components";
import CameraOptions from "./CameraOptions";
import { useCamera } from "@customeHooks";

const Camera = ({ videoRef }) => {
  const constraints = {
    audio: true,
    video: {
      width: 1280,
      height: 720,
    },
  };
  const mediaStream = useCamera(constraints);
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }
  const handlePlay = () => {
    videoRef.current.play();
  };

  //live streaming starts from here

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
          <video
            id="localVideo"
            playsinline
            autoplay
            ref={videoRef}
            onCanPlay={handlePlay}
            muted
            style={{
              transform: "scaleX(-1)",
            }}
          ></video>
        </Box>
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

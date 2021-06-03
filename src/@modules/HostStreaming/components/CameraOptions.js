import React, { useState, useCallback, useEffect } from "react";

import { Box, Row, Col, Text, Clickable, Icon } from "@components";
import { socket } from "@helpers/sockets";

const CameraOptions = () => {
  const [capturing, setCapturing] = useState(false);

  const handleNewBroadcaster = () => {
    socket.emit("broadcaster", {
      broadcasterId: localStorage.getItem("userId"),
    });
  };

  const launchBroadcast = async () => {
    socket.emit("new-broadcaster", localStorage.getItem("userId"));
  };

  const disconnectBroadcaster = async () => {
    socket.emit("stop-broadcaster");
  };

  useEffect(() => {
    window.onunload = window.onbeforeunload = () => {
      disconnectBroadcaster();
    };
  }, [window]);

  const startStream = async () => {
    setCapturing(true);
    handleNewBroadcaster();
    launchBroadcast();
  };

  const stopStream = useCallback(() => {
    setCapturing(false);
    disconnectBroadcaster();
  }, []);
  return (
    <Row noFlex center between>
      <Col noFlex>
        <Text
          color="#ffffff"
          size="12px"
          weight="bold"
          marg="0.4rem 0 0 0.8rem"
        >
          Live Streaming Title
        </Text>
        <Text color="#848388" size="11px" weight="400" marg="0.4rem 0 0 0.8rem">
          description
        </Text>
      </Col>
      <Row noFlex center>
        <Clickable>
          <Box
            bg="#1e1f1e"
            hasRadius="100%"
            pad="6px 8px"
            marg="0 1rem 0 0"
            centerAll
          >
            <Icon type="micro-phone" width="22px" height="20px" />
          </Box>
        </Clickable>
        <Clickable
          onClick={() => {
            capturing ? stopStream() : startStream();
          }}
        >
          {capturing ? (
            <Box
              bg="#1e1f1e"
              hasRadius="100%"
              pad=" 8px"
              marg="0 1rem 0 0"
              centerAll
            >
              <Icon type="stop" width="20px" height="20px" />
            </Box>
          ) : (
            <Box
              bg="#1e1f1e"
              hasRadius="100%"
              pad=" 8px"
              marg="0 1rem 0 0"
              centerAll
            >
              <Icon type="camera" width="20px" height="20px" />
            </Box>
          )}
        </Clickable>
      </Row>
    </Row>
  );
};

export default CameraOptions;

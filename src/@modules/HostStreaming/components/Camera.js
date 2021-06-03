import React, { useState, useEffect, useCallback, useRef } from "react";

import { Box, Row, Col, Text } from "@components";
import CameraOptions from "./CameraOptions";
import { config } from "@helpers/streaming";
import { useCamera } from "@customeHooks";
import { socket } from "@helpers/sockets";

const Camera = () => {
  const [capturing, setCapturing] = useState(false);
  const [broadcaster, setBroadcaster] = useState("");
  const [peerConnections, setPeerConnections] = useState({});
  const [numberOfViewers, setNumberOfViewers] = useState(0);
  const [broadcastLaunched, setBroadcastLaunched] = useState(false);
  const [constraints, setConstraints] = useState({
    audio: true,
    video: {
      width: 1280,
      height: 720,
    },
  });

  const videoRef = useRef(null);
  const mediaStream = useCamera(constraints);
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  useEffect(() => {
    socket.on("watcher", (broadcasterId, watcherId) => {
      const peerConnection = new RTCPeerConnection(config);
      peerConnections[watcherId] = peerConnection;
      setPeerConnections((peerConnections[watcherId] = peerConnection));
      let stream = videoRef.current.srcObject;
      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", broadcasterId, watcherId, event.candidate);
        }
      };

      peerConnection
        .createOffer()
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit(
            "offer",
            broadcasterId,
            watcherId,
            peerConnection.localDescription
          );
        });
      socket.emit("new-watcher-joined", {
        broadcasterId: broadcasterId,
        watchersCount: Object.keys(peerConnections).length,
      });
      setNumberOfViewers(Object.keys(peerConnections).length);
    });
    return () => {
      socket.off("watcher");
    };
  }, []);

  useEffect(() => {
    socket.on("answer", (id, description) => {
      peerConnections[id].setRemoteDescription(description);
    });
    return () => {
      socket.off("answer");
    };
  }, []);

  useEffect(() => {
    socket.on("candidate", (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });
    return () => {
      socket.off("candidate");
    };
  }, []);
  useEffect(() => {
    socket.on("disconnectPeer", (id) => {
      peerConnections[id].close();
      delete peerConnections[id];
      setNumberOfViewers(Object.keys(peerConnections).length);
    });
    return () => {
      socket.off("disconnectPeer");
    };
  }, []);

  useEffect(() => {
    window.onunload = window.onbeforeunload = () => {
      disconnectBroadcaster();
    };
  }, [window]);

  const handlePlay = () => {
    videoRef.current.play();
  };
  const handleNewBroadcaster = () => {
    socket.emit("broadcaster", {
      broadcasterId: localStorage.getItem("userId"),
    });
  };

  const launchBroadcast = async () => {
    setBroadcastLaunched(true);
    socket.emit("new-broadcaster", localStorage.getItem("userId"));
  };
  const disconnectBroadcaster = async () => {
    socket.emit("stop-broadcaster");
  };

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

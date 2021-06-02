import React, { useEffect, useRef, useState } from "react";

import { Watchers, Chat, Header, Camera, StreamingStatus } from "./components";
import { config } from "@helpers/streaming";
import { Row, Col } from "@components";
import { socket } from "@helpers/sockets";

const HostStreaming = () => {
  const videoRef = useRef();
  const [peerConnections, setPeerConnections] = useState({});
  const [numberOfViewers, setNumberOfViewers] = useState(0);
  useEffect(() => {
    socket.on("watcher", (broadcasterId, watcherId) => {
      const peerConnection = new RTCPeerConnection(config);
      peerConnections[watcherId] = peerConnection;

      setPeerConnections((peerConnections[watcherId] = peerConnection));
      let stream = videoRef.current.srcObject;
      console.log("host streamis ", stream);
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

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "scroll",
        overflowX: "hidden",
        backgroundColor: "#080707",
      }}
    >
      <Row marg="2rem 0 0 0" pad="2rem" ht="88vh">
        <Col bg="#1f1f1f" noFlex wid="16%" hasRadius="10px">
          <Watchers />
        </Col>
        <Col bg="#1f1f1f" marg="0 1.4rem" hasRadius="10px">
          <Camera videoRef={videoRef} />
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
    </div>
  );
};

export default HostStreaming;

import React, { useState, useRef, useEffect } from "react";

import { Watchers, Chat, Header, Camera, StreamingStatus } from "./components";
import { Row, Col } from "@components";
import { config } from "@helpers/streaming";
import { socket } from "@helpers/sockets";

const GuestStreaming = (props) => {
  const { watchersCount: currentWatchers, broadcasterId } =
    (props.location && props.location.state) || {};

  let peerConnection;
  const videoRef = useRef();

  const [localWatchersCount, setLocalWatchersCount] = useState(currentWatchers);

  useEffect(() => {
    socket.emit("watcher", broadcasterId, localStorage.getItem("userId"));
    return () => {
      socket.off("watcher");
    };
  }, [broadcasterId]);

  useEffect(() => {
    socket.on("candidate", (id, candidate) => {
      peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error(e));
    });
    return () => {
      socket.off("candidate");
    };
  }, []);

  useEffect(() => {
    window.onunload = window.onbeforeunload = () => {
      socket.emit("watcher-disconnect", localStorage.getItem("userId"));
      peerConnection.close();
      socket.close();
    };
  }, [window]);

  useEffect(() => {
    socket.on("disconnectPeer", () => {
      peerConnection.close();
    });
    return () => {
      socket.off("disconnectPeer");
    };
  }, []);

  useEffect(() => {
    socket.on("new-watcher-joined", ({ broadcasterId, watchersCount }) => {
      setLocalWatchersCount(watchersCount);
    });
    return () => {
      socket.off("new-watcher-joined");
    };
  }, []);

  useEffect(() => {
    socket.on("offer", (broadcasterId, description) => {
      peerConnection = new RTCPeerConnection(config);
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then((sdp) => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit(
            "answer",
            broadcasterId,
            localStorage.getItem("userId"),
            peerConnection.localDescription
          );
        });
      peerConnection.ontrack = (event) => {
        console.log("got the stream with", event.streams[0]);
        videoRef.current.srcObject = event.streams[0];
      };
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit(
            "candidate",
            broadcasterId,
            localStorage.getItem("userId"),
            event.candidate
          );
        }
      };
    });
    return () => {
      socket.off("offer");
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

export default GuestStreaming;

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Clickable, StreamCard, CreateStreamCard } from "@components";
import { socket } from "@helpers/sockets";

const Streams = () => {
  const history = useHistory();

  const [streams, setStreams] = useState([]);

  useEffect(() => {
    socket.on("broadcaster", ({ broadcasterId }) => {
      setStreams([
        ...streams,
        {
          broadcasterId,
          watchersCount: 0,
        },
      ]);
    });
    return () => {
      socket.off("broadcaster");
    };
  }, []);

  useEffect(() => {
    if (streams?.length > 0) {
      socket.on("new-watcher-joined", ({ broadcasterId, watchersCount }) => {
        const tempStreams = streams.map((singleStream) => {
          if (
            singleStream.broadcasterId.toString() === broadcasterId.toString()
          ) {
            return { ...singleStream, watchersCount };
          } else {
            return singleStream;
          }
        });
        setStreams(tempStreams);
      });
      return () => {
        socket.off("new-watcher-joined");
      };
    }
  }, [streams]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "scroll",
        overflowX: "hidden",
        backgroundColor: "#080707",
        padding: "12vh 9vw",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Clickable onClick={() => history.push("/host-streaming")}>
          <CreateStreamCard />
        </Clickable>
        {streams?.length > 0 &&
          streams.map((singleStream) => (
            <Clickable
              onClick={() =>
                history.push({
                  pathname: "/guest-streaming",
                  state: {
                    watchersCount: singleStream.watchersCount,
                    broadcasterId: singleStream.broadcasterId,
                  },
                })
              }
            >
              <StreamCard />
            </Clickable>
          ))}
      </div>
    </div>
  );
};

export default Streams;

import React from "react";
import { useHistory } from "react-router-dom";

import { Clickable, StreamCard, CreateStreamCard } from "@components";

const Streams = () => {
  const history = useHistory();
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
        <Clickable onClick={() => history.push("/live-streaming")}>
          <CreateStreamCard />
        </Clickable>
        <StreamCard />
        <StreamCard />
        <StreamCard />
      </div>
    </div>
  );
};

export default Streams;

import React from "react";

import { Row, StreamCard } from "@components";

const Streams = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "scroll",
        overflowX: "hidden",
        backgroundColor: "#080707",
        padding: "12vh 6vw",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <StreamCard />
        <StreamCard />
        <StreamCard />
      </div>
    </div>
  );
};

export default Streams;

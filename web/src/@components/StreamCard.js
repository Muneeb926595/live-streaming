import React from "react";

import { Box, Clickable, Text } from "@components";
import streamPlaceholder from "assets/icons/stream-placeholder.jpg";

const StreamCard = () => {
  return (
    <Box
      wid="20vw"
      ht="20vh"
      border="1px solid #dbdbdb"
      hasRadius="10px"
      hasShadow="0px 0px 10px #6d6d1d"
      marg="10px"
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "10px",
        }}
        src={streamPlaceholder}
      />

      <Box
        absolute
        top="10px"
        right="10px"
        bg="red"
        pad="4px 10px"
        hasRadius="6px"
      >
        <Text color="#ffffff" marg="0">
          10
        </Text>
      </Box>
      <Box absolute bottom="0px" left="10px">
        <Text color="#ffffff">Testing</Text>
      </Box>
    </Box>
  );
};

export default StreamCard;

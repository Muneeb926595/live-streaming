import React from "react";

import { Row, Box, Avatar, Text } from "@components";

const SingleMessage = () => {
  return (
    <Row marg="1rem 0 0 0">
      <Row marg="0 0.4rem 0 0">
        <Avatar size={44} />
      </Row>
      <Box bg="#414649" wid="100%" hasRadius="4px">
        <Text
          color="#dbdbdb"
          size="13px"
          weight="bold"
          marg="0.4rem 0 0 0.8rem"
        >
          UserName{" "}
        </Text>
        <Text color="#dbdbdb" size="11px" weight="400" marg="0.4rem 0 0 0.8rem">
          just some random message from this user{" "}
        </Text>
      </Box>
    </Row>
  );
};

export default SingleMessage;

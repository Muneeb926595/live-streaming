import React from "react";

import { Box, Icon, Text } from "@components";
import streamPlaceholder from "assets/icons/stream-placeholder.jpg";

const CreateStreamCard = () => {
  return (
    <Box
      wid="10vw"
      ht="20vh"
      border="1px solid #dbdbdb"
      hasRadius="10px"
      hasShadow="0px 0px 10px #6d6d1d"
      marg="10px"
      centerAll
    >
      <Icon type="add-stream" size="40px" />
    </Box>
  );
};

export default CreateStreamCard;

import React from "react";

import { Border, Row, Col, Box, Text } from "@components";
import SingleWatcher from "./SingleWatcher";

const Watchers = () => {
  const watchersList = ["12", "1", "2", "3", "4", "5"];
  return (
    <Box wid="100%">
      <Row noFlex wid="100%" between center bg="#373737" pad="0 1rem">
        <Text color="#ffffff" size="12px" weight="bold">
          Watchers
        </Text>
        <Row></Row>
      </Row>
      <Col>
        {watchersList.map((singleWatcher, index) => (
          <>
            <SingleWatcher />
            <Border />
          </>
        ))}
      </Col>
    </Box>
  );
};

export default Watchers;

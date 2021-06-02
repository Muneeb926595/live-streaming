import React from "react";

import { Row, Col, Avatar, Text, Icon, Clickable } from "@components";

const SingleWatcher = ({ userImage, userName, location }) => {
  return (
    <Row noFlex center pad="14px">
      <Row center>
        <Avatar size={44} />
        <Col noFlex>
          <Text
            color="#ffffff"
            size="12px"
            weight="bold"
            marg="0.4rem 0 0 0.8rem"
          >
            UserName
          </Text>
          <Text
            color="#848388"
            size="11px"
            weight="400"
            marg="0.4rem 0 0 0.8rem"
          >
            Pakistan
          </Text>
        </Col>
      </Row>
      <Clickable>
        <Icon type="kick-out" size="25px" />
      </Clickable>
    </Row>
  );
};

export default SingleWatcher;

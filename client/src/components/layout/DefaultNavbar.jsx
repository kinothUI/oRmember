import React from "react";
import { Menu, Container, Segment, Header } from "semantic-ui-react";

const DefaultNavbar = () => {
  return (
    <React.Fragment>
      <Menu attached inverted borderless size='small'>
        <Container>
          <Segment inverted>
            <Header>oRmember - keep your trading clean and tidy</Header>
          </Segment>
        </Container>
      </Menu>
    </React.Fragment>
  );
};

export default DefaultNavbar;

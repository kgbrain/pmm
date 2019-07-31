import React, { Component } from "react";
import { Container, Box, Typography } from "@material-ui/core";

export default class Me extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Me
          </Typography>
        </Box>
      </Container>
    );
  }
}

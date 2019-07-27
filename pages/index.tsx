import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import PmmButton from "../ui-components/PmmButton/PmmButton";
import theme, { cardStyles } from "../ui-components/theme";

function Home() {
  const classes = cardStyles(theme);
  return (
    <Paper className={classes.root}>
      <div>
        <PmmButton
          buttonOpts={{ color: "primary", variant: "contained" }}
          linkOpts={{ href: "/me" }}
        >
          Click me
        </PmmButton>
      </div>
      <br />
      <Typography variant="body2" color="textSecondary" display="block">
        Built with ❤️ by KGBrain
      </Typography>
    </Paper>
  );
}

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          [<i style={{ fontFamily: "Georgia, sans-serif" }}>p</i>]MM
        </Typography>
        <Home />
      </Box>
    </Container>
  );
}

import React from 'react';
import { Button, Typography, Paper, Container, Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import firebase, { GoogleAuthProvider } from '../firebase';
import theme, { cardStyles } from '../ui-components/theme';

export default function Login() {
  const router = useRouter();
  const classes = cardStyles(theme);

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(new GoogleAuthProvider())
      .then(() => {
        router.push('/');
      })
      .catch(error => {
        // tslint:disable-next-line: no-console
        console.log(error);
      });
  };

  return (
    <>
      <Container maxWidth='sm'>
        <Paper className={classes.root}>
          <Typography variant='h3' component='h3' align='center'>
            Welcome
          </Typography>
          <Typography variant='h4' align='center'>
            [<i>p</i>]mm
          </Typography>
          <Box textAlign='center'>
            <Button
              onClick={handleLogin}
              size='large'
              variant='contained'
              color='primary'
            >
              Login with Google
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

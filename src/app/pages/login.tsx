import React from 'react';
import { Button, Typography, Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import firebase, { GoogleAuthProvider } from '../firebase';
import theme, { cardStyles } from '../ui-components/theme';

export default function Login(props) {
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
      <Paper className={classes.root}>
        <Typography variant='h1' component='h3' align='center'>
          Welcome
        </Typography>
        <Typography variant='h2' align='center'>
          [<i>p</i>]mm
        </Typography>
        <Button
          onClick={handleLogin}
          size='large'
          variant='contained'
          color='primary'
        >
          Login with Google
        </Button>
      </Paper>
    </>
  );
}

import React from 'react';
import { Button, Typography, Container, Box, Avatar, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useRouter } from 'next/router';
import firebase, { GoogleAuthProvider } from '../firebase';
import theme, { loginStyles } from '../ui-components/theme';

export default function Login() {
  const router = useRouter();
  const classes = loginStyles(theme);

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

  function Copyright() {
    return (
      <Typography variant='body2' color='textSecondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='https://pmm-tool.web.app'>
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'. Built with '}
        <Link color='inherit' href='https://pmm-tool.web.app'>
          [<i>p</i>]mm.
        </Link>
      </Typography>
    );
  }

  return (
    <>
      <Container component='main' maxWidth='sm'>
        <div className={classes.root}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
          <Typography variant='h5' component='h1' align='center'>
            Sign in to [<i>p</i>]mm
          </Typography>
          <Button
            className={classes.login}
            onClick={handleLogin}
            size='large'
            variant='contained'
            color='primary'
          >
            Login with Google
          </Button>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

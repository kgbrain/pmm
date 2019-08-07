import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import firebase, { GoogleAuthProvider } from '../firebase';
import Home from '../ui-components/home/home';

interface IFirebaseProps {
  user: object;
  messages: object;
}

interface IFirebaseState {
  user: object;
  messages: object;
  value: string;
  unsubscribe?: () => void;
}

export default class Index extends Component<IFirebaseProps, IFirebaseState> {
  public static async getInitialProps({ req, query }) {
    const user = req && req.session ? req.session.decodedToken : null;
    // don't fetch anything from firebase if the user is not found
    // const snap = user && await req.firebaseServer.database().ref('messages').once('value')
    // const messages = snap && snap.val()
    const messages = null;
    return { user, messages };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      value: '',
      messages: this.props.messages,
    };
  }

  public componentDidMount() {
    if (this.state.user) { this.addDbListener(); }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        // return user
        //   .getIdToken()
        //   .then(token => {
        //     // eslint-disable-next-line no-undef
        //     return fetch("/api/login", {
        //       method: "POST",
        //       // eslint-disable-next-line no-undef
        //       headers: new Headers({ "Content-Type": "application/json" }),
        //       credentials: "same-origin",
        //       body: JSON.stringify({ token })
        //     });
        //   })
        //   .then(res => this.addDbListener());
        this.addDbListener();
      } else {
        this.setState({ user: null });
        // eslint-disable-next-line no-undef
        // fetch("/api/logout", {
        //   method: "POST",
        //   credentials: "same-origin"
        // }).then(() => this.removeDbListener());
        this.removeDbListener();
      }
    });
  }

  public render() {
    const { user, value, messages } = this.state;

    return (
      <Container maxWidth='sm'>
        {user ? (
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleLogout}
          >
            Logout
          </Button>
        ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={this.handleLogin}
            >
              Login
            </Button>
          )}
        {user && (
          <div>
            <Box my={4}>
              <Typography variant='h4' component='h1' gutterBottom={true}>
                [<i style={{ fontFamily: 'Georgia, sans-serif' }}>p</i>]MM
              </Typography>
              <Home />
            </Box>
            <form onSubmit={this.handleSubmit}>
              <input
                type={'text'}
                onChange={this.handleChange}
                placeholder={'add message...'}
                value={value}
              />
            </form>
            <ul>
              {messages &&
                Object.keys(messages).map((key) => (
                  <li key={key}>{messages[key].text}</li>
                ))}
            </ul>
          </div>
        )}
      </Container>
    );
  }

  private addDbListener = () => {
    const db = firebase.firestore();
    // Disable deprecated features
    const unsubscribe = db.collection('messages').onSnapshot(
      (querySnapshot) => {
        const messages = {};
        querySnapshot.forEach((doc) => {
          messages[doc.id] = doc.data();
        });
        if (messages) { this.setState({ messages }); }
      },
      (error) => {
        // tslint:disable-next-line: no-console
        console.error(error);
      },
    );
    this.setState({ unsubscribe });
  }

  private removeDbListener = () => {
    // firebase.database().ref('messages').off()
    if (this.state.unsubscribe) {
      this.state.unsubscribe();
    }
  }

  private handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  private handleSubmit = (event) => {
    event.preventDefault();
    const db = firebase.firestore();
    const date = new Date().getTime();
    db.collection('messages')
      .doc(`${date}`)
      .set({
        id: date,
        text: this.state.value,
      });
    this.setState({ value: '' });
  }

  private handleLogin() {
    firebase.auth().signInWithPopup(new GoogleAuthProvider());
    // .then(result => {
    //   const user = result.user;
    //   console.log(user);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

  private handleLogout() {
    firebase.auth().signOut();
  }

}

import React, { Component } from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import firebase from '../firebase';

interface IFirebaseProps {
  messages: object;
}

interface IFirebaseState {
  messages: object;
  unsubscribe?: () => void;
}

export default class Me extends Component<IFirebaseProps, IFirebaseState> {
  public static async getInitialProps({ req, query }) {
    const messages = null;
    return { messages };
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages,
    };
  }

  public componentDidMount() {
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

  public render() {
    const { messages } = this.state;

    return (
      <Container maxWidth='sm'>
        <Box my={4}>
          <Typography variant='h4' component='h1' gutterBottom={true}>
            Messages
          </Typography>
        </Box>
        <ul>
          {messages &&
            Object.keys(messages).map((key) => (
              <li key={key}>{messages[key].text}</li>
            ))}
        </ul>
      </Container>
    );
  }
}

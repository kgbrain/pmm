import React, { Component } from 'react';
import { TextField, Box, Typography } from '@material-ui/core';
import firebase from '../firebase';
import { AuthContext } from '../context';

export default class Index extends Component {
  public static contextType = AuthContext;

  public state = {
    value: '',
    messages: [],
    unsubscribe: null
  };

  public componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.addDbListener();
      } else {
        this.removeDbListener();
      }
    });
  }

  public render() {
    const { value, messages } = this.state;
    const user = this.context && this.context.user;

    return (
      <>
        <Box my={4}>
          <Typography variant='h4' component='h1' gutterBottom={true}>
            Add Messages
          </Typography>
        </Box>
        {user && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id='message'
                label='Message'
                onChange={this.handleChange}
                placeholder={'Add Message...'}
                value={value}
              />
            </form>
            <ul>
              {messages &&
                Object.keys(messages).map(key => (
                  <li key={key}>{messages[key].text}</li>
                ))}
            </ul>
          </div>
        )}
      </>
    );
  }

  private handleChange = event => {
    this.setState({ value: event.target.value });
  };

  private handleSubmit = event => {
    event.preventDefault();
    const db = firebase.firestore();
    const date = new Date().getTime();
    db.collection('messages')
      .doc(`${date}`)
      .set({
        id: date,
        text: this.state.value
      });
    this.setState({ value: '' });
  };

  private addDbListener = () => {
    const db = firebase.firestore();
    // Disable deprecated features
    const unsubscribe = db.collection('messages').onSnapshot(
      querySnapshot => {
        const messages = {};
        querySnapshot.forEach(doc => {
          messages[doc.id] = doc.data();
        });
        if (messages) {
          this.setState({ messages });
        }
      },
      error => {
        // tslint:disable-next-line: no-console
        console.error(error);
      }
    );
    this.setState({ unsubscribe });
  };

  private removeDbListener = () => {
    // firebase.database().ref('messages').off()
    if (this.state.unsubscribe) {
      this.state.unsubscribe();
    }
  };
}

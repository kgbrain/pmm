import React, { useContext, useState } from 'react';
import { Box, Typography, LinearProgress } from '@material-ui/core';
import firebase, { useFirestoreQuery } from '../firebase';
import { AuthContext } from '../context';

export default function Me() {
  const user = useContext(AuthContext);
  const [messages, setMessages] = useState('');

  const { isLoading, data } = useFirestoreQuery(
    firebase.firestore().collection('messages')
  );

  function dataToMessagesList(
    querySnapshotData: firebase.firestore.QuerySnapshot
  ) {
    return (
      <ul>
        {querySnapshotData &&
          querySnapshotData.docs
            .map(el => el.data())
            .map(message => <li key={message.id}>{message.text}</li>)}
      </ul>
    );
  }

  return (
    <>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom={true}>
          My Messages
        </Typography>
      </Box>
      {user && (
        <div>{isLoading ? <LinearProgress /> : dataToMessagesList(data)}</div>
      )}
    </>
  );
}

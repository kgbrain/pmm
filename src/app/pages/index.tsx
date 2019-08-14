import React, { useContext, useState } from 'react';
import { TextField, Box, Typography, LinearProgress } from '@material-ui/core';
import firebase, { useFirestoreQuery, setFirestoreQuery } from '../firebase';
import { AuthContext } from '../context';

export default function Index() {
  const user = useContext(AuthContext);
  const [value, setValue] = useState('');

  const { isLoading, data } = useFirestoreQuery(
    firebase.firestore().collection('messages')
  );

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const date = new Date().getTime().toString();

    setFirestoreQuery(firebase.firestore().collection('messages'), date, {
      id: date,
      text: value
    });
    setValue('');
  }

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
          Add Messages
        </Typography>
      </Box>
      {user && (
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              id='message'
              label='Message'
              onChange={handleChange}
              placeholder={'Add Message...'}
              value={value}
            />
          </form>
          {isLoading ? <LinearProgress /> : dataToMessagesList(data)}
        </div>
      )}
    </>
  );
}

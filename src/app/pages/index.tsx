import React, { useContext, useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import firebase, { useFirestoreQuery, setFirestoreQuery } from '../firebase';
import { AuthContext } from '../context';

export default function Index() {
  const user = useContext(AuthContext);
  const [value, setValue] = useState('');

  const { isLoading, data } = useFirestoreQuery(
    firebase.firestore().collection('pm')
  );

  function dataToMessagesList(
    querySnapshotData: firebase.firestore.QuerySnapshot
  ) {
    return (
      <List component='nav' aria-label='main mailbox folders'>
        {querySnapshotData &&
          querySnapshotData.docs
            .map(el => el.data())
            .map(pm => (
              <ListItem button={true} alignItems='flex-start' key={pm.id}>
                <ListItemText
                  primary={pm.title}
                  secondary={new Date(pm.date.seconds).toLocaleString()}
                />
                <ListItemIcon style={{ maxWidth: 0 }}>
                  <ChevronRightIcon />
                </ListItemIcon>
              </ListItem>
            ))}
      </List>
    );
  }

  return (
    <>
      {user && (
        <div>{isLoading ? <LinearProgress /> : dataToMessagesList(data)}</div>
      )}
    </>
  );
}

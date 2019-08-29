import React, { useContext } from 'react';
import { Grid, LinearProgress, TextField } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import pmmTheme from '../../../ui-components/theme';
import firebase, { useFirestoreQuery, useQuery } from '../../../firebase';
import Link from 'next/link';
import { AuthContext } from '../../../context';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    form: {
      padding: '48px 36px 0'
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

function PMDetail(title, date, summary) {
  return (
    <div>
      <Grid container={true} spacing={3}>
        <Grid item={true} xs={12}>
          <TextField
            label='Title'
            placeholder='Add title...'
            fullWidth={true}
            value={title}
          />
        </Grid>
        <Grid item={true} xs={12} sm={6}>
        <TextField
            label='Date'
            placeholder='Add date...'
            fullWidth={true}
            value={date}
          />
        </Grid>
        {summary &&
          <Grid item={true} xs={12}>
            <TextField
              label='Summary'
              multiline={true}
              fullWidth={true}
              value={summary}
            />
        </Grid>
        }
      </Grid>
      </div>
  );
}

export default function Detail() {
  const classes = useStyles(pmmTheme);
  const user = useContext(AuthContext);
  const router = useRouter();
  const { pmid } = router.query;

  const { isLoading, data } = useQuery(
    firebase.firestore().collection('pm'),
    'where',
    ['id', '==', `${pmid}`]
  );
  
  function dataToDetail(
    querySnapshotData: any
  ) {
  return (
    <div className={classes.root}>
      <Link href='/'>
        <a>Back to Dashboard</a>
      </Link>
      {querySnapshotData &&
          querySnapshotData.docs
            .map(el => el.data())
            .map(pm => (
              <div className={classes.form} key={pm.id}>
                <p>{pmid}</p>
                {PMDetail(pm.title, new Date(pm.date.seconds), pm.summary)}
              </div>
        ))}
    </div>
  );
}

  return (
    <>
      {user && (
        <div>{isLoading ? <LinearProgress /> : dataToDetail(data)}</div>
      )}
    </>
  );
}

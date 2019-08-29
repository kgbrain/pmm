import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useState, useEffect } from 'react';

const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

export default (!firebase.apps.length
  ? firebase.initializeApp({
    apiKey: 'AIzaSyB2_nW_degEIS7IRwho0suNrLhw8sqeksQ',
    authDomain: 'pmm-tool.firebaseapp.com',
    databaseURL: 'https://pmm-tool.firebaseio.com',
    projectId: 'pmm-tool',
    storageBucket: '',
    messagingSenderId: '199350724866',
    appId: '1:199350724866:web:1905e599f5e63c7e',
  })
  : firebase.app());
export { GoogleAuthProvider };

export const useFirestoreQuery = (ref: firebase.firestore.CollectionReference) => {
  const [docState, setDocState] = useState<{ isLoading: boolean, data: null | firebase.firestore.QuerySnapshot }>({
    isLoading: true,
    data: null
  });
  let unsubscribe: any;

  useEffect(() => {
    unsubscribe = ref.onSnapshot(docs => {
      setDocState({
        isLoading: false,
        data: docs
      });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return docState;
};

export const useQuery = (ref: firebase.firestore.CollectionReference, querySymbol: string, predicate: string[]) => {
  const [docState, setDocState] = useState<{ isLoading: boolean, data: null | firebase.firestore.QuerySnapshot }>({
    isLoading: true,
    data: null
  });
  let unsubscribe: any;

  useEffect(() => {
    unsubscribe = ref[querySymbol](...predicate).onSnapshot(docs => {
      setDocState({
        isLoading: false,
        data: docs
      });
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return docState;
};

export const setFirestoreQuery = (ref: firebase.firestore.CollectionReference, doc: string, data: object) => {
  ref.doc(`${doc}`).set(data);
}

import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA4OTDy3crqaCVlG1vXJEOOZNrQ7aY6tFw',
  authDomain: 'blockchain-golf.firebaseapp.com',
  databaseURL: 'https://blockchain-golf.firebaseio.com',
  projectId: 'blockchain-golf',
  storageBucket: 'blockchain-golf.appspot.com',
  messagingSenderId: '417136532423',
  appId: '1:417136532423:web:7f1f3e384c164bb371d7e2',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;

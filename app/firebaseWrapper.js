import * as firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA4OTDy3crqaCVlG1vXJEOOZNrQ7aY6tFw',
  authDomain: 'blockchain-golf.firebaseapp.com',
  databaseURL: 'https://blockchain-golf.firebaseio.com',
  projectId: 'project-itas-golf-32',
  storageBucket: 'blockchain-golf.appspot.com',
  messagingSenderId: '417136532423',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export const provider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export default firebase;

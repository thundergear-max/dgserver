import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

  var firebaseConfig = {
    apiKey: "AIzaSyBghmMrWE3h0OwkcBJrhWShT_S4VgIBqY0",
    authDomain: "brad-gallery1.firebaseapp.com",
    projectId: "brad-gallery1",
    storageBucket: "brad-gallery1.appspot.com",
    messagingSenderId: "101825458816",
    appId: "1:101825458816:web:85cd6cb32d877fb3e12c65",
    measurementId: "G-HVDR8WV8GG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyB1aRXA7xoSbDZjHO8dj2ffYNKNUEFAVKk",
    authDomain: "superman-game-6ce43.firebaseapp.com",
    projectId: "superman-game-6ce43",
    storageBucket: "superman-game-6ce43.appspot.com",
    messagingSenderId: "487113460026",
    appId: "1:487113460026:web:320406c8e55d755c11a803",
    measurementId: "G-WY8E36H2M2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  export const auth = firebase.auth;
  export const db = firebase.database();
  export default firebase;
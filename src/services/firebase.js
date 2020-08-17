import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAcvn9Ovp6VDSDMW8WiXu27hzvdgZIuh3U",
    authDomain: "sources-storage.firebaseapp.com",
    databaseURL: "https://sources-storage.firebaseio.com",
    projectId: "sources-storage",
    storageBucket: "sources-storage.appspot.com",
    messagingSenderId: "662099457205",
    appId: "1:662099457205:web:ef77f8dd882d1539cc3afc",
    measurementId: "G-KS78HV5SZT"
  };
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = storage.ref();
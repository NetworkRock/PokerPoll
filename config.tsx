// Firebase imports
import firebase from 'firebase';
// Optionally import the services that you want to use
//  import "firebase/auth";
//  import "firebase/database";
//  import "firebase/functions";
import "firebase/storage";
import "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAMYZm9txkH40dck1WYOsO2e-OhJRCIHog",
  authDomain: "pokerpoll-2b206.firebaseapp.com",
  projectId: "pokerpoll-2b206",
  storageBucket: "pokerpoll-2b206.appspot.com",
  messagingSenderId: "577559239614",
  appId: "1:577559239614:web:effa01d5ad445ecc46b7ef",
  measurementId: "G-8TK7X2RKJZ"
});
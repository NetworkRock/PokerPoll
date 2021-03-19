// Firebase imports
// Optionally import the services that you want to use
//  import 'firebase/auth';
//  import 'firebase/database';
//  import 'firebase/functions';
import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/firestore'

// import for instant search
import algoliasearch from 'algoliasearch'


export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAMYZm9txkH40dck1WYOsO2e-OhJRCIHog',
  authDomain: 'pokerpoll-2b206.firebaseapp.com',
  projectId: 'pokerpoll-2b206',
  storageBucket: 'pokerpoll-2b206.appspot.com',
  messagingSenderId: '577559239614',
  appId: '1:577559239614:web:effa01d5ad445ecc46b7ef',
  measurementId: 'G-8TK7X2RKJZ'
})

export const searchClient = algoliasearch(
  '57XM6Q0ID9',
  'fe63733ff35627b1291b4fa02ce07bdb'
)
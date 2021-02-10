import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/app/store'
// Firebase imports
import * as firebase from 'firebase';
// Optionally import the services that you want to use
//  import "firebase/auth";
//  import "firebase/database";
//  import "firebase/functions";
//  import "firebase/storage";
import "firebase/firestore";
import { firebaseConfig } from './config';
//  Set the config for firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>My super cool PokerPoll App!</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SearchPollsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Search for polls!</Text>
    </View>
  )
}

const MyPollsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Here u can see polls where you created or you where invented from somebody!</Text>
    </View>
  )
}

const ClosedPollsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Here appears all closed Polls</Text>
    </View>
  )
}


const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View>
  )
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="SearchPolls" component={SearchPollsScreen} />
          <Tab.Screen name="MyPolls" component={MyPollsScreen} />
          <Tab.Screen name="ClosedPolls" component={ClosedPollsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
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

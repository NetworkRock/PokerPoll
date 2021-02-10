
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
// Redux imports
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

//  App component imports
import PollList from './src/app/components/Polls/PollList';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SearchPollsScreen = () => {
  return <PollList/>
}

const MyPollsScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text>Here u can see polls where you created or you where invented from somebody!</Text>
    </View>
  )
}

const ClosedPollsScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text>Here appears all closed Polls</Text>
    </View>
  )
}

const SettingsScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text>Settings!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={globalStyles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="SearchPolls" component={SearchPollsScreen} />
          <Tab.Screen name="MyPolls" component={MyPollsScreen} />
          <Tab.Screen name="ClosedPolls" component={ClosedPollsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

// TODO: later do that in a seperated file --> styles for the App.tsx file
const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

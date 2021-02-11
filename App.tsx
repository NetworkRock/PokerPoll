
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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
import { HEADER_BTN_TYPES } from './src/app/components/NavigationComponents/HeaderButtonEnum';

/**
 * Check if there already exist a firebase instance
 */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

/**
 * Define the Navigators for the app 
 */
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootSearchPollsStack = createStackNavigator();

/**
 * Workflow of search polls
 */
const SearchPollsStack = () => {
  return (
    <RootSearchPollsStack.Navigator mode="card" headerMode="float">
      <RootSearchPollsStack.Screen
        name="SearchPollsScreen"
        component={SearchPollsScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Search Polls</Text>,
          headerRight: () => <Button title={HEADER_BTN_TYPES.CREATE} onPress={() => navigation.navigate('CreatePollsStack')}/>,
          headerLeft: () => <View />,
        })}
      />
    </RootSearchPollsStack.Navigator>
  )
}

/**
 * Workflow of creating polls
 */
const CreatePollsStack = () => {
  return (
    <RootSearchPollsStack.Navigator mode="card" headerMode="float"
      screenOptions={{
          headerBackTitle: HEADER_BTN_TYPES.CANCEL,
      }}
      >
      <RootSearchPollsStack.Screen
        name="AddMembersToPollScreen"
        component={AddMembersToPollScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Member</Text>,
          headerRight: () => <Button title={HEADER_BTN_TYPES.NEXT} onPress={() => navigation.navigate('CreateNewPollScreen')} />,
        })}
      />
      <RootSearchPollsStack.Screen
        name="CreateNewPollScreen"
        component={CreateNewPollScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Create poll</Text>,
          headerRight: () => <Button title={HEADER_BTN_TYPES.CREATE} onPress={() => navigation.navigate('SearchPollsScreen')} />,
          headerBackTitleVisible: false
        })}
      />
    </RootSearchPollsStack.Navigator>
  )
}

/**
 * Detail screens for creating the poll workflow
 */
const AddMembersToPollScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text>Add members here!</Text>
    </View>
  )
}
const CreateNewPollScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text>Create a new Poll here!</Text>
    </View>
  )
}



/**
 * Define how the navigatio details for the tab bar
 */
const BottomTabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="SearchPollsStack" component={SearchPollsStack} />
      <Tab.Screen name="MyPollsScreen" component={MyPollsScreen} />
      <Tab.Screen name="ClosedPolls" component={ClosedPollsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

/**
 * App global entry point
 */
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={globalStyles.safeArea}>
        <NavigationContainer>
          <RootStack.Navigator mode="modal" headerMode="none">
            <RootStack.Screen
              name='BottomTabBar'
              component={BottomTabBar}
            />
            <RootStack.Screen
              name='CreatePollsStack'
              component={CreatePollsStack}
            />
            <RootStack.Screen
              name='AddMembersToPoll'
              component={AddMembersToPollScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}


const SearchPollsScreen = () => {
  return (
    <PollList />
  )
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
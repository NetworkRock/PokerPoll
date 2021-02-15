import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, ScrollView } from 'react-native';
// Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// Redux imports
import { Provider } from 'react-redux';
import store from './src/app/store'
// Import firebase config
import { firebaseApp } from './config';

//  App component imports
import PollList from './src/app/components/Polls/PollList';
import { HEADER_BTN_TYPES } from './src/app/components/NavigationComponents/HeaderButtonEnum';
import AddPostForm from './src/app/components/Polls/AddPollForm';
import AddUserForm from './src/app/components/Users/UserLogInComponents/AddUserForm';
import AddTeamForm from './src/app/components/Teams/AddTeamForm';
import AddTeamHeaderBtn from './src/app/components/Teams/AddTeamHeaderBtn'
import UserSearchList from './src/app/components/Users/UserSearchList';
import UserSearchListHeader from './src/app/components/Users/UserSearchListHeader';
import UserSearchListAddedMemebersHeader from './src/app/components/Users/UserSearchListAddedMembersHeader';
import TeamList from './src/app/components/Teams/TeamList';



/**
 * Define the Navigators for the app 
 */
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootPollsForGroupStack = createStackNavigator();
const RootUserLogInStack = createStackNavigator();
const RootTeamStack = createStackNavigator();

/**
 * Stack for poll teams
 */
const PollTeamStack = () => {
  return (
    <RootTeamStack.Navigator 
      mode="card" 
      headerMode="float" 
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <RootTeamStack.Screen
        name="PollTeamScreen"
        component={PollTeamScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Search for poll teams</Text>,
          headerRight: () => <Button title={HEADER_BTN_TYPES.CREATE} onPress={() => navigation.navigate('CreatePollTeamStack')} />,
          headerLeft: () => <View />,
        })}
      />
      <RootTeamStack.Screen
        name="PollsForGroupStack"
        component={PollsForGroupStack}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Search Polls</Text>,
          headerRight: () => <Button title={HEADER_BTN_TYPES.CREATE} onPress={() => navigation.navigate('CreatePollsStack')} />,
        })}
      />
    </RootTeamStack.Navigator>
  )
}
/**
 * Team List Screen
 */
const PollTeamScreen = () => {
  return (
    <View style={globalStyles.container}>
      <TeamList/>
    </View>
  )
}

/**
 * Workflow of showing polls for one group
 */
const PollsForGroupStack = () => {
  return (
    <RootPollsForGroupStack.Navigator mode="card" headerMode="none">
      <RootTeamStack.Screen
        name="PollsForGroupScreen"
        component={PollsForGroupScreen}
      />
    </RootPollsForGroupStack.Navigator>
  )
}
const PollsForGroupScreen = () => {
  return (
    <PollList />
  )
}


/**
 * Workflow of creating a team
 */
const CreatePollTeamStack = () => {
  return (
    <RootTeamStack.Navigator mode="card" headerMode="float"
      screenOptions={{
        headerBackTitle: HEADER_BTN_TYPES.CANCEL,
      }}
    >
      <RootTeamStack.Screen
        name="AddMembersToPollScreen"
        component={AddMembersToPollScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Invite members to vote</Text>,
          headerRight: () => <Button title={HEADER_BTN_TYPES.NEXT} onPress={() =>  navigation.navigate('CreateNewTeamScreen')}/>,
        })}
      />
      <RootTeamStack.Screen
        name="CreateNewTeamScreen"
        component={CreateNewTeamScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Create your team</Text>,
          headerRight: () => <AddTeamHeaderBtn navigation={navigation}/>,
          headerBackTitleVisible: false
        })}
      />
    </RootTeamStack.Navigator>
  )
}
/**
 * Detail screens for creating the team workflow
 */
const AddMembersToPollScreen = () => {
  return (
    <View style={globalStyles.container}>
      <UserSearchListHeader />
      <View style={globalStyles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} horizontal={true} alwaysBounceHorizontal={false} >
          <UserSearchListAddedMemebersHeader />
        </ScrollView>
      </View>
      <UserSearchList />
    </View>
  )
}
const CreateNewTeamScreen = () => {
  return (
    <View style={globalStyles.container}>
      <AddTeamForm />
      <View style={globalStyles.container} >
        <ScrollView contentContainerStyle={globalStyles.addTeamFormHorizontalScrollView} horizontal={false} alwaysBounceHorizontal={false} >
          <UserSearchListAddedMemebersHeader />
        </ScrollView>
      </View>
    </View>
  )
}






/**
 * Workflow of creating polls
 */
const CreatePollsStack = () => {
  return (
    <RootPollsForGroupStack.Navigator mode="card" headerMode="float"
      screenOptions={{
        headerBackTitle: HEADER_BTN_TYPES.CANCEL,
      }}
    >
      <RootPollsForGroupStack.Screen
        name="CreateNewPollScreen"
        component={CreateNewPollScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Create poll</Text>,
          headerRight: () => <Button title={HEADER_BTN_TYPES.CREATE} onPress={() => navigation.navigate('PollsForGroupStack')} />,
          headerBackTitleVisible: false
        })}
      />
    </RootPollsForGroupStack.Navigator>
  )
}

const CreateNewPollScreen = () => {
  return (
    <AddPostForm />
  )
}



/**
 * Define how the navigatio details for the tab bar
 */
const BottomTabBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PollTeamStack" component={PollTeamStack}></Tab.Screen>
      <Tab.Screen name="MyPollsScreen" component={MyPollsScreen} />
      <Tab.Screen name="ClosedPolls" component={ClosedPollsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}


/**
 * Workflow for verify and log in user
 */
const UserLogInScreen = ({ navigation }) => {
  return (
    <AddUserForm navigate={navigation} />
  )
}
const UserLogInStack = () => {
  return (
    <RootUserLogInStack.Navigator mode="card" headerMode="none">
      <RootUserLogInStack.Screen
        name="UserLogInScreen"
        component={UserLogInScreen}
      />
    </RootUserLogInStack.Navigator>
  )
}





/**
 * App global entry point
 */
export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <RootStack.Navigator mode="modal" headerMode="none">
            <RootStack.Screen
              name='UserLogInStack'
              component={UserLogInStack}
            />
            <RootStack.Screen
              name='BottomTabBar'
              component={BottomTabBar}
            />
          <RootStack.Screen
            name='CreatePollTeamStack'
            component={CreatePollTeamStack}
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
    </Provider>
  );
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
  const logout = async () => await firebaseApp.auth().signOut();
  return (
    <View style={globalStyles.container}>
      <Text>Logout!</Text>
      <Button title="Logout" onPress={logout}></Button>
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
  addMembersToPollScreen: {
    flex: 1,
  },
  addedMembersScrollView: {
    backgroundColor: 'skyblue',
  },
  addTeamFormHorizontalScrollView: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  }
});
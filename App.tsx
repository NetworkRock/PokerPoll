// React specific
import React from 'react'
import { StyleSheet, Text, View, Button, KeyboardAvoidingView, Platform } from 'react-native'

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

// Redux
import { Provider } from 'react-redux'
import { store } from './src/app/store'

//  App component imports
import PollList from './src/app/components/Polls/PollList/PollList'
import ClosedPollList from './src/app/components/Polls/PollList/ClosedPollList'
import AddPostForm from './src/app/components/Polls/AddPoll/AddPollForm'
import AddUserForm from './src/app/components/Users/UserLogInComponents/AddUserForm'
import AddTeamForm from './src/app/components/Teams/AddTeamForm'
import AddTeamHeaderBtn from './src/app/components/Teams/AddTeamHeaderBtn'
import AddPollHeaderBtn from './src/app/components/Polls/AddPoll/AddPollHeaderBtn'
import UserSearchList from './src/app/components/Users/UserSearchList'
import UserSearchListAddedMemebersHeader from './src/app/components/Users/UserSearchListAddedMembersHeader'
import TeamList from './src/app/components/Teams/TeamList'

// Enums
import { HEADER_BTN_TYPES } from './src/app/components/NavigationComponents/HeaderButtonEnum'

// Icons

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import SettingsView from './src/app/components/Settings/SettingsView'
import RatingPollForm from './src/app/components/Polls/DetailsPoll/RatingPollForm'
import ResultPollForm from './src/app/components/Polls/DetailsPoll/ResultPollForm'


/**
 * Define the Navigators for the app 
 */
const RootStack = createStackNavigator()
const Tab = createBottomTabNavigator()
const RootPollsForGroupStack = createStackNavigator()
const RootPollsDetailStack = createStackNavigator()
const RootUserLogInStack = createStackNavigator()
const RootTeamStack = createStackNavigator()
const RootClosedPollsStack = createStackNavigator()

/**
 * Stack for poll teams
 */
const PollTeamStack = () => {
  return (
    <RootTeamStack.Navigator
      mode='card'
      headerMode='float'
      screenOptions={{
        headerBackTitleVisible: false,
      }}>
      <RootTeamStack.Screen
        name='PollTeamScreen'
        component={PollTeamScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Poll Teams</Text>,
          headerRight: () => <Button title={HEADER_BTN_TYPES.CREATE} onPress={() => navigation.navigate('CreatePollTeamStack')} />,
          headerLeft: () => <View />,
        })}
      />
      <RootTeamStack.Screen
        name='PollsForGroupStack'
        component={PollsForGroupStack}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Polls</Text>,
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
      <TeamList />
    </View>
  )
}

/**
 * Workflow of showing polls for one group
 */
const PollsForGroupStack = () => {
  return (
    <RootPollsForGroupStack.Navigator mode='card' headerMode='none'>
      <RootPollsForGroupStack.Screen
        name='PollsForGroupScreen'
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
 * Workflow of showing details for one poll
 */
const PollsDetailStack = () => {
  return (
    <RootPollsDetailStack.Navigator mode='modal' headerMode='screen'>
      <RootPollsDetailStack.Screen
        name='PollsDetailScreen'
        component={PollsDetailScreen}
        options={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerTitle: () => <Text>VOTE SCREEN</Text>,
          headerLeft: () => <Button title={HEADER_BTN_TYPES.SAVE} onPress={() => navigation.navigate('PollsForGroupStack')} />,
        })}
      />
      <RootPollsDetailStack.Screen
        name='PollsDetailResultScreen'
        component={PollsDetailResultScreen}
        options={() => ({
          headerBackTitleVisible: false,
          headerTitle: () => <Text>Details</Text>,
        })}
      />
    </RootPollsDetailStack.Navigator>
  )
}
/**
 * Detail screens for the details poll workflow
 */
const PollsDetailScreen = () => {
  return (
    <RatingPollForm />
  )
}
const PollsDetailResultScreen = ({ route }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
      <ResultPollForm route={route} />
    </KeyboardAvoidingView>
  )
}


/**
 * Workflow of creating a team
 */
const CreatePollTeamStack = () => {
  return (
    <RootTeamStack.Navigator mode='card' headerMode='float'
      screenOptions={{
        headerBackTitle: HEADER_BTN_TYPES.CANCEL,
      }}
    >
      <RootTeamStack.Screen
        name='AddMembersToPollScreen'
        component={AddMembersToPollScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Invite members to vote</Text>,
          headerRight: () => <Button title={HEADER_BTN_TYPES.NEXT} onPress={() => navigation.navigate('CreateNewTeamScreen')} />,
        })}
      />
      <RootTeamStack.Screen
        name='CreateNewTeamScreen'
        component={CreateNewTeamScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Create your team</Text>,
          headerRight: () => <AddTeamHeaderBtn navigation={navigation} />,
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
      <View style={globalStyles.container}>
        <UserSearchList />
      </View>
    </KeyboardAvoidingView>
  )
}
const CreateNewTeamScreen = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
      <View style={globalStyles.container}>
        <AddTeamForm />
        <View style={globalStyles.container} >
          <UserSearchListAddedMemebersHeader />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}






/**
 * Workflow of creating polls
 */
const CreatePollsStack = () => {
  return (
    <RootPollsForGroupStack.Navigator mode='card' headerMode='float'
      screenOptions={{
        headerBackTitle: HEADER_BTN_TYPES.CANCEL,
      }}
    >
      <RootPollsForGroupStack.Screen
        name='CreateNewPollScreen'
        component={CreateNewPollScreen}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Create poll</Text>,
          headerRight: () => <AddPollHeaderBtn navigation={navigation} />,
          headerBackTitleVisible: false
        })}
      />
    </RootPollsForGroupStack.Navigator>
  )
}

const CreateNewPollScreen = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
      <AddPostForm />
    </KeyboardAvoidingView>
  )
}



/**
 * Define how the navigatio details for the tab bar
 */
const BottomTabBar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: 'white',
          minHeight: 90
        },
        activeTintColor: '#0099ff',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name='PollTeamStack'
        component={PollTeamStack}
        options={({ route }) => ({
          title: 'Poll Teams',
          tabBarIcon: ({ color, size }) => {
            // You can return any component that you like here!
            return <Icon name='account-group' size={size} color={color} />
          },
        })}
      />
      <Tab.Screen
        name='ClosedPollStack'
        component={ClosedPollStack}
        options={({ route }) => ({
          title: 'Closed Polls',
          tabBarIcon: ({ color, size }) => {
            // You can return any component that you like here!
            return <SimpleLineIcons name='lock' size={size} color={color} />
          },
        })}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={() => ({
          title: 'Settings',
          tabBarIcon: ({ color, size }) => {
            // You can return any component that you like here!
            return <Icon name='cog' size={size} color={color} />
          },
        })}
      />
    </Tab.Navigator>
  )
}


/**
 * Workflow for verify and log in user
 */
const UserLogInScreen = ({ navigation }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
      <AddUserForm navigate={navigation} />
    </KeyboardAvoidingView>
  )
}
const UserLogInStack = () => {
  return (
    <RootUserLogInStack.Navigator mode='card' headerMode='none'>
      <RootUserLogInStack.Screen
        name='UserLogInScreen'
        component={UserLogInScreen}
      />
    </RootUserLogInStack.Navigator>
  )
}




/**
 * Root modal navigator 
 */

const RootModalStack = () => {
  return (
    <RootStack.Navigator mode='modal' headerMode='none'>
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
      <RootTeamStack.Screen
        name='PollsDetailStack'
        component={PollsDetailStack}
        options={({ navigation }) => ({
          headerTitle: () => <Text>Details for the Poll</Text>,

        })}
      />
    </RootStack.Navigator>
  )
}

/**
 * App global entry point
 */
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator mode='card' headerMode='none' screenOptions={{ gestureEnabled: false }}>
          <RootStack.Screen
            name='UserLogInStack'
            component={UserLogInStack}
          />
          <RootStack.Screen
            name='RootModalStack'
            component={RootModalStack}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const ClosedPollStack = () => {
  return (
    <RootClosedPollsStack.Navigator mode='card' headerMode='screen'>
      <RootClosedPollsStack.Screen
        name='ClosedPollListScreen'
        component={ClosedPollListScreen}
        options={() => ({
          headerTitle: () => <Text>Closed Polls</Text>,
        })}
      />
    </RootClosedPollsStack.Navigator>
  )
}


const ClosedPollListScreen = () => {
  return (
    <ClosedPollList />
  )
}



const SettingsScreen = () => {

  return (
    <SettingsView />
  )
}




// TODO: later do that in a seperated file --> styles for the App.tsx file
const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainerForMembers: {
    //alignSelf: 'stretch',
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
})
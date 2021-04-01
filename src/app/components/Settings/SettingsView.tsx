// React specific
import React from 'react'
import { View, Text, Button, Image } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

// Redux
import { selectUser, clearUpUserState } from '../../../features/users/userSlice'
import { clearUpTeamState } from '../../../features/team/teamSlice'
import { clearUpPollState } from '../../../features/polls/pollSlice'

// Firebase
import { firebaseApp } from '../../../../config'

// Style
import stlye_settings from './stlye_settings'
import { useAppDispatch, useAppSelector } from '../../hooks'

const SettingsView = (): JSX.Element => {
  const currentUser = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const logout = async () => {
    try {
      await dispatch(clearUpTeamState())
      await dispatch(clearUpPollState())
      await firebaseApp.auth().signOut().then(() => {
        navigation.navigate('UserLogInScreen')
      })
    } catch (error) {
      console.error('Failed to logout: ', error)
    }

  }

  return (
    <View style={stlye_settings.container}>
      <Text style={stlye_settings.settings_title}>{currentUser?.displayName}</Text>
      <Image source={{ uri: currentUser?.photoURL }} style={stlye_settings.img} />
      <View style={stlye_settings.logout_btn}>
        <Button title='Logout' onPress={logout}></Button>
      </View>
    </View>
  )
}

export default SettingsView
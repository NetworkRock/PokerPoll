import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, Image } from 'react-native';
import stlye_settings from "./stlye_settings";
import { selectCurrentUser, clearUpUserState } from '../../../features/users/userSlice'
import { clearUpTeamState } from '../../../features/team/teamSlice'
import { clearUpPollState } from '../../../features/polls/pollSlice'
import { firebaseApp } from '../../../../config'

const SettingsView = (props) => {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      await dispatch(clearUpUserState())
      await dispatch(clearUpTeamState())
      await dispatch(clearUpPollState())
      await firebaseApp.auth().signOut().then(() => {
        props.navigation.navigate('UserLogInStack')
      });
    } catch (error) {
      console.error("Failed to logout: ", error)
    }

  }

  return (
    <View style={stlye_settings.container}>
      <Text style={stlye_settings.settings_title}>{currentUser.displayName}</Text>
      <Image source={{ uri: currentUser.profilePictureURL }} style={stlye_settings.img} />
      <View style={stlye_settings.logout_btn}>
        <Button title="Logout" onPress={logout}></Button>
      </View>
    </View>
  )
}

export default SettingsView
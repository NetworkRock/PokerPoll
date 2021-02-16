import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Button, Image } from 'react-native';
import stlye_settings from "./stlye_settings";
import { selectCurrentUser } from '../../../features/users/userSlice'
import { firebaseApp } from '../../../../config'

const SettingsView = (props) => {
  const currentUser = useSelector(selectCurrentUser)

  const logout = async () => {
    console.log("PROPS: ", props.navigation.navigate('UserLogInStack'))
    try {
      await firebaseApp.auth().signOut();
    } catch (error) {
      console.error("Failed to logout: ", error)
    }

  }

  return (
    <View style={stlye_settings.container}>
      <Text style={stlye_settings.settings_title}>Settings</Text>
      <Image source={{ uri: currentUser.profilePictureURL }} style={stlye_settings.img} />
      <Text style={stlye_settings.userName}>{currentUser.displayName}</Text>
      <View style={stlye_settings.logout_btn}>
        <Button title="Logout" onPress={logout}></Button>
      </View>
    </View>
  )
}

export default SettingsView
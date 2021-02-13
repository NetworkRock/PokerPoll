import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import React, { useState } from 'react'
import { View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import style_userForm from './style_userForm';
import { addNewUser } from '../../../features/users/userSlice';
import * as ImagePicker from 'expo-image-picker';
import { firebaseApp } from '../../../../config';
import { nanoid } from '@reduxjs/toolkit'



export const AddUserForm = (props) => {
  const [displayName, setDisplayName] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState(null)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const onDisplayNameDisplayName = e => setDisplayName(e)

  const canLogin =
  [displayName, profilePictureURL].every(Boolean) && addRequestStatus === 'idle'

  const signInAnonymouslyClicked = () => {
    firebaseApp.auth().onAuthStateChanged(async (firebaseAuthUserData) => {
      if (firebaseAuthUserData) {
        if (canLogin) {
          try {
            setAddRequestStatus('pending')
            const resultAction = await dispatch(
              addNewUser({ displayName, profilePictureURL})
            )
            unwrapResult(resultAction)
            setDisplayName('')
          } catch (error) {
            console.error('Failed to log in: ', error)
          } finally {
            setAddRequestStatus('idle')
            props.navigate.navigate('BottomTabBar');
          }
        }
      } else {
        console.log("USER LOG OUT")
      }
    });
    try {
      firebaseApp.auth().signInAnonymously().then(() => {
        console.log("SIGNED IN");
      })
    } catch (error) {
      console.log("Error sign in: ", error)
    }
  }

  const b64toBlob = async (uri: string)  => {
    const dieter = await (await fetch(uri)).blob()
    console.log("HALLO: ", dieter);
    return dieter
  }

  const selectAProfilePicture = async () => {
      const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (permissions.status !== 'granted') {
        alert("Sorry, we need camera roll permissions to make this work!");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [5, 5],
          quality: 1,
        });
        if (!result.cancelled) {
          const storageRef = firebaseApp.storage().ref()
          console.log(result);
          const fileRef = storageRef.child('userProfilePicture/' + nanoid())
          const blobFile = await b64toBlob(result.uri)
          await fileRef.put(blobFile)
          setProfilePictureURL(await fileRef.getDownloadURL());
        }
      }
  }



  return (
    <View style={style_userForm.container}>
      <TouchableOpacity style={style_userForm.imgContainer}
        onPress={selectAProfilePicture}
      >
        <Image source={{
          uri: profilePictureURL,
        }} style={style_userForm.img} />
      </TouchableOpacity>
      <Text>SIGN IN</Text>
      <TextInput
        placeholder="Give yourself a cool Nickname!"
        placeholderTextColor="#C8C8C8"
        value={displayName}
        onChangeText={onDisplayNameDisplayName}
      />
      <Button
        title="Log In"
        disabled={!canLogin}
        onPress={signInAnonymouslyClicked}
      />
    </View>
  )
}

export default AddUserForm
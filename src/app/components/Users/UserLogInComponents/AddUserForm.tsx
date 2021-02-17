import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import style_userLogIn from './style_userLogIn';
import { addNewUser } from '../../../../features/users/userSlice';
import * as ImagePicker from 'expo-image-picker';
import { firebaseApp } from '../../../../../config';
import { nanoid } from '@reduxjs/toolkit'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export const AddUserForm = (props) => {
  const [defaultImage, setDefaultImage] = useState(null);
  const [loading, setLoading] = useState("");
  const [displayName, setDisplayName] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState(null)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  useEffect(() => {
    if(loading === "loading" && !profilePictureURL) {
      setDefaultImage(<ActivityIndicator size="large" />)
    } else if (!profilePictureURL) {
      setDefaultImage(
        <View style={style_userLogIn.imgContainer}>
          <Icon name='account' color="lightgrey" size={130} />
        </View>)
    } else {
      setDefaultImage(<Image source={{ uri: profilePictureURL }} style={style_userLogIn.img} />)
    }
  }, [profilePictureURL, loading])


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
        console.info("USER LOG OUT")
      }
    });
    try {
      firebaseApp.auth().signInAnonymously().then(() => {
        console.info("SIGNED IN");
      })
    } catch (error) {
      console.error("Error sign in: ", error)
    }
  }

  const b64toBlob = async (uri: string) => {
    const blobFile = await (await fetch(uri)).blob()
    console.info("blobFile: ", blobFile);
    return blobFile
  }

  const selectAProfilePicture = async () => {
    
    const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissions.status !== 'granted') {
      alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      setLoading("loading")
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 0.1,
      });
      if (!result.cancelled) {
        const storageRef = firebaseApp.storage().ref()
        const fileRef = storageRef.child('userProfilePicture/' + nanoid())
        const blobFile = await b64toBlob(result.uri)
        await fileRef.put(blobFile)
        setProfilePictureURL(await fileRef.getDownloadURL());
      }
    }
  }



  return (
      <View style={style_userLogIn.container}>
        <Text style={style_userLogIn.signInTitle}>PokerPoll</Text>
        <TouchableOpacity style={style_userLogIn.imgContainer}
          onPress={selectAProfilePicture}
        >
          {defaultImage}
        </TouchableOpacity>
        <TextInput
          placeholder="Type a Nickname!"
          placeholderTextColor="#C8C8C8"
          value={displayName}
          onChangeText={onDisplayNameDisplayName}
          style={style_userLogIn.nickNameField}
          maxLength={25}
        />
        <View style={style_userLogIn.logInBtn}>
          <Button
            title="Log In"
            disabled={!canLogin}
            onPress={signInAnonymouslyClicked}
          />
        </View>
      </View>
  )
}

export default AddUserForm
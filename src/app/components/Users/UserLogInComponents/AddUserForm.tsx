import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import style_userLogIn from './style_userLogIn';
import { addNewUser } from '../../../../features/users/userSlice';
import * as ImagePicker from 'expo-image-picker';
import { firebaseApp } from '../../../../../config';
import { nanoid } from '@reduxjs/toolkit'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

export const AddUserForm = (props) => {
  const [defaultImage, setDefaultImage] = useState(null)
  const [loading, setLoading] = useState("");
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState(null)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const auth = firebaseApp.auth()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const onDisplayName = e => {
    e.trim()
    setDisplayName(e)
  }
  const onEmail = e => setEmail(e)
  const onPassword = e => setPassword(e)

  const canSignUp = [displayName.trim().length > 2, email, password, profilePictureURL].every(Boolean) && addRequestStatus === 'idle'
  const canLogIn = [displayName.trim().length > 2, email, password].every(Boolean) && addRequestStatus === 'idle'

  const loginClicked = () => {
    const loginPromise = auth.signInWithEmailAndPassword(email, password)
    loginPromise.then(async (e) => {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewUser(e.user))
        Alert.alert("Login successfull")
        navigation.navigate('RootModalStack', { screen: 'BottomTabBar' });
      } catch (error) {
        console.error("Error by login user: ", error)
      } finally {
        setAddRequestStatus('idle')
        setLoading('')
      }
    }).catch(e => Alert.alert("Error:" + e))
  }

  const signUpClicked = () => {
    if (canSignUp) {
      const signUpPromise = auth.createUserWithEmailAndPassword(email, password)
      signUpPromise.then(async (cred) => {
        try {
          const user = {
            id: cred.user?.uid,
            displayName: displayName,
            email: email,
            password: password,
            profilePictureURL: profilePictureURL
          }
          setAddRequestStatus('pending')
          await dispatch(addNewUser(user))
          navigation.navigate('RootModalStack', { screen: 'BottomTabBar' });
          setDisplayName('')
          setEmail('')
          setPassword('')
          setProfilePictureURL(null)
        } catch (error) {
          console.error("SIGN UP ERROR: ", error)
        } finally {
          setAddRequestStatus('idle')
        }
      }).catch((e) => Alert.alert("Error: " + e))
    }
  }



  useEffect(() => {
    if (loading === "loading" && !profilePictureURL) {
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
      <View style={style_userLogIn.headerContainer}>
        <Text style={style_userLogIn.signInTitle}>Poker Poll</Text>
      </View>
      <View  style={style_userLogIn.imgContainer}>
      <TouchableOpacity
        onPress={selectAProfilePicture}
      >
        {defaultImage}
      </TouchableOpacity>
      </View>
      <View style={style_userLogIn.textInputContainer}>
      <TextInput
        placeholder="Type in a nickname"
        placeholderTextColor="#C8C8C8"
        value={displayName}
        onChangeText={onDisplayName}
        style={style_userLogIn.nickNameField}
        maxLength={25}
      />
      <TextInput
        placeholder="Type your email"
        placeholderTextColor="#C8C8C8"
        value={email}
        onChangeText={onEmail}
        style={style_userLogIn.nickNameField}
        maxLength={25}
      />
      <TextInput
          secureTextEntry={true}
          placeholder="Type in your password"
          placeholderTextColor="#C8C8C8"
          value={password}
          onChangeText={onPassword}
          style={style_userLogIn.nickNameField}
        />
        <View style={style_userLogIn.btnContainer}>
          <Button
            title="Log In"
            onPress={loginClicked}
            disabled={!canLogIn}
          />
          <Button
            title="Sign Up"
            onPress={signUpClicked}
            disabled={!canSignUp}
          />
        </View>
      </View>

    </View>
  )
}

export default AddUserForm
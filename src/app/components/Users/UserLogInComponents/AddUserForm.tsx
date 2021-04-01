// React specific imports
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Redux
import { selectUser, signUpUser, logInUser } from '../../../../features/users/userSlice'
import { nanoid } from '@reduxjs/toolkit'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks'

// Style imports
import style_userLogIn from './style_userLogIn'

// Expo imports
import * as ImagePicker from 'expo-image-picker'

// Firebase
import { firebaseApp } from '../../../../../config'
import firebase from 'firebase'

export const AddUserForm = (): JSX.Element => {
  // Firebase refs
  const auth = firebaseApp.auth()
  const storageRef = firebaseApp.storage().ref()

  // React hooks
  const user: firebase.User | null = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const [profilePictureURL, setProfilePictureURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Event listener
  const onDisplayName = (displayName: string) => setDisplayName(displayName)
  const onEmail = (email: string) => setEmail(email)
  const onPassword = (password: string) => setPassword(password)

  // Boolean checks
  const canSignUp = [displayName.trim().length > 2, email, password].every(Boolean)


  const setDefaulProfilePicture = async (storageRef: firebase.storage.Reference) => {
    const defaultProfilePictureURL = await storageRef.child('userProfilePicture/defaultProfilePicture.jpg').getDownloadURL()
    setProfilePictureURL(defaultProfilePictureURL)
  }
  useEffect(() => {
    setDefaulProfilePicture(storageRef)
  }, [])

  const loginClicked = () => {

      auth.signInWithEmailAndPassword(user?.email, password)
      .then(async (userCredential: firebase.auth.UserCredential) => {
        try {
          if (userCredential.user !== null && auth.currentUser) {
            await dispatch(logInUser(userCredential.user))
            setPassword('')
            navigation.navigate('RootModalStack', { screen: 'BottomTabBar' })
          }
        } catch (error) {
          console.error('Error by login user: ', error)
        }
      })
      .catch(error => alert(error.message))
  }

  const signUpClicked = () => {
    if (canSignUp) {
      const signUpPromise = auth.createUserWithEmailAndPassword(email, password)
      signUpPromise
        .then(async (userCredential: firebase.auth.UserCredential) => {
          try {
            if (userCredential.user !== null && auth.currentUser) {
              await auth.currentUser.updateProfile({
                displayName: displayName.trim(),
                photoURL: profilePictureURL
              })
              await dispatch(signUpUser(auth.currentUser))
              setDisplayName('')
              setEmail('')
              setPassword('')
              await setDefaulProfilePicture(storageRef)
              navigation.navigate('RootModalStack', { screen: 'BottomTabBar' })
            }
          } catch (error) {
            alert(error.message)
          }
        })
        .catch((error) => {
          alert(error.message)
        })
    }}


  // Use fetch here to convert the b64 file to blob
  const b64toBlob = async (uri: string) => {
    return await (await fetch(uri)).blob()
  }

  const checkLibraryPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  const selectProfilePicture = async () => {
    await checkLibraryPermissions()
    setLoading(true)
    const image: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 0.1,
    })
    console.log(image)
    if (!image.cancelled) {
      const fileRef = storageRef.child('userProfilePicture/' + nanoid())
      const blobFile = await b64toBlob(image.uri)
      await fileRef.put(blobFile)
      setProfilePictureURL(await fileRef.getDownloadURL())
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const heading: JSX.Element =
    <View style={style_userLogIn.headerContainer}>
      <Text style={style_userLogIn.signInTitle}>Poker Poll</Text>
    </View>

  const imageContainer: JSX.Element =
    <View style={style_userLogIn.imgContainer}>
      <TouchableOpacity
        onPress={selectProfilePicture}
      >
        {
          loading ? <ActivityIndicator size="large" /> : <Image source={{ uri: profilePictureURL }} style={style_userLogIn.img} />
        }
      </TouchableOpacity>
    </View>

  const passworBtn: JSX.Element = <TextInput
    secureTextEntry={true}
    placeholder="Type in your password"
    placeholderTextColor="#C8C8C8"
    value={password}
    onChangeText={onPassword}
    style={style_userLogIn.nickNameField}
  />

  const signUpView: JSX.Element = <View style={style_userLogIn.textInputContainer}>
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
    {passworBtn}
    <View style={style_userLogIn.btnContainer}>
      <Button
        title="Sign Up"
        onPress={signUpClicked}
        disabled={!canSignUp}
      />
    </View>
  </View>

  const loginView: JSX.Element = <View style={style_userLogIn.textInputContainer}>
    {passworBtn}
    <View style={style_userLogIn.btnContainer}>
      <Button
        title="Log In"
        onPress={loginClicked}
        disabled={!password}
      />
    </View>
  </View>

  return (
    <View style={style_userLogIn.container}>
      {heading}
      {imageContainer}
      {
        !user ? signUpView : loginView
      }


    </View>
  )
}

export default AddUserForm
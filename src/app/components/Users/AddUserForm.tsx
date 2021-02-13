import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert } from "react-native";
import style_userForm from './style_userForm';
import { addNewUser } from '../../../features/users/userSlice';
import firebase from "firebase";



export const AddUserForm = (props) => {
  const [displayName, setDisplayName] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const onDisplayNameDisplayName = e => setDisplayName(e)

  const signInAnonymouslyClicked = () => {
    firebase.auth().onAuthStateChanged(async (firebaseAuthUserData) => {
      if (firebaseAuthUserData) {
        if(displayName && addRequestStatus) {
          try {
            setAddRequestStatus('pending')
            const resultAction = await dispatch(
              addNewUser({displayName})
            )
            unwrapResult(resultAction)
            setDisplayName('')
          } catch (error) {
            console.error('Failed to save the post: ', error)
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
      firebase.auth().signInAnonymously().then(() => {
        console.log("SIGNED IN");
      })
    } catch (error) {
      console.log("Error sign in: ", error)
    }
  }



  return (
    <View style={style_userForm.container}>
      <Text>SIGN IN</Text>
      <TextInput
        placeholder="Give yourself a cool Nickname!"
        placeholderTextColor="#C8C8C8"
        value={displayName}
        onChangeText={onDisplayNameDisplayName}
      />
      <Button
        title="Log In"
        disabled={!displayName}
        onPress={signInAnonymouslyClicked}
      />
    </View>
  )
}

export default AddUserForm
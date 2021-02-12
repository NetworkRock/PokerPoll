import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addNewPoll, pollAdded } from '../../../features/polls/pollSlice';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { unwrapResult } from '@reduxjs/toolkit'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave =
  [title, description].every(Boolean) && addRequestStatus === 'idle'

  const onTitleChanged = e => setTitle(e)
  const onDescriptionChanged = e => setDescription(e)

  const dispatch = useDispatch()

  const onSavePollClicked = async () => {
    if(canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPoll({title, description})
        )
        unwrapResult(resultAction)
        setTitle('')
        setDescription('')
      } catch (error) {
        console.error('Failed to save the post: ', error)
      } finally {
        setAddRequestStatus('idle')
      }
    } 
  }

  return (
    <View style={styleAddPollForm.container}>
      <Text>Create a new Poll</Text>
      <TextInput
        placeholder="How is your poll called?"
        placeholderTextColor="#C8C8C8"
        value={title}
        onChangeText={onTitleChanged}
      />
      <TextInput
        placeholder="Describe what the poll is about"
        placeholderTextColor="#C8C8C8"
        multiline={true}
        numberOfLines={4}
        value={description} 
        onChangeText={onDescriptionChanged}
      />
      <Button title="create poll" onPress={onSavePollClicked} />
    </View>
  )
}

// TODO: later do that in a seperated file --> styles for the App.tsx file
const styleAddPollForm = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddPostForm
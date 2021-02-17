import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPoll, pollAdded } from '../../../features/polls/pollSlice';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { unwrapResult } from '@reduxjs/toolkit'
import { selectCurrentGroup } from '../../../features/polls/pollSlice'
import styleAddPollForm from './stlye_addPollForm'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const currentTeamId = useSelector(selectCurrentGroup)

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
          addNewPoll({title, description, currentTeamId})
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
      <View style={styleAddPollForm.headerContainer}>
        <TextInput
          style={styleAddPollForm.textField}
          placeholder="How is your poll called?"
          placeholderTextColor="#C8C8C8"
          value={title}
          onChangeText={onTitleChanged}
          maxLength={25}
        />
      </View>
      <View style={styleAddPollForm.descriptionContainer}>
        <TextInput
          style={styleAddPollForm.textArea}
          placeholder="Describe what the poll is about"
          placeholderTextColor="#C8C8C8"
          multiline={true}
          numberOfLines={12}
          value={description}
          onChangeText={onDescriptionChanged}
        />
        <Button title="create poll" onPress={onSavePollClicked} />
      </View>
    </View>
  )
}

export default AddPostForm
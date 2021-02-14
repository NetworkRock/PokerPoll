import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { unwrapResult } from '@reduxjs/toolkit'
import { addTeamTitle, addNewTeam } from '../../../features/team/teamSlice'
import { selectNewAddedTeamMembers } from '../../../features/team/teamSlice'

const AddTeamForm = () => {
  const [title, setTitle] = useState('')
  const addedUsers = useSelector(selectNewAddedTeamMembers)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave =
  [title, addedUsers.length > 0].every(Boolean) && addRequestStatus === 'idle'

  const onTitleChanged = e => setTitle(e)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addTeamTitle(title));
  }, [title])

  const onCreatedTeamClicked = async () => {
    if(canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTeam({title, addedUsers})
        )
        unwrapResult(resultAction)
        setTitle('')
      } catch (error) {
        console.error('Failed to save the team: ', error)
      } finally {
        setAddRequestStatus('idle')
      }
    } 
  }

  return (
    <View style={styleAddPollForm.container}>
      <Text>Create a new Team</Text>
      <TextInput
        placeholder="How is your team called?"
        placeholderTextColor="#C8C8C8"
        value={title}
        onChangeText={onTitleChanged}
      />
      <Button title="create the team" onPress={onCreatedTeamClicked} />
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
    alignSelf: 'stretch',
    backgroundColor: '#0099ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddTeamForm
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTeam } from '../../../features/team/teamSlice';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { unwrapResult } from '@reduxjs/toolkit'

const AddTeamForm = () => {
  const [title, setTitle] = useState('')
  const [members, setMembers] = useState([])
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave =
  [title, members.length !== 0].every(Boolean) && addRequestStatus === 'idle'

  const onTitleChanged = e => setTitle(e)
  const onMembersChanged = e => setMembers(e)

  const dispatch = useDispatch()

  const onCreatedTeamClicked = async () => {
    if(canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTeam({title, members})
        )
        unwrapResult(resultAction)
        setTitle('')
        setMembers([])
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
    backgroundColor: '#0099ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddTeamForm
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { unwrapResult } from '@reduxjs/toolkit'
import { addTeamTitle, addNewTeam } from '../../../features/team/teamSlice'
import { selectNewAddedTeamMembers } from '../../../features/team/teamSlice'
import style_addTeamForm from "./style_addTeamForm";

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
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTeam({ title, addedUsers })
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
    <View style={style_addTeamForm.container}>
      <Text style={style_addTeamForm.label}>Create a new Team</Text>
      <TextInput
        style={style_addTeamForm.textField}
        placeholder="How is your team called?"
        placeholderTextColor="#C8C8C8"
        value={title}
        onChangeText={onTitleChanged}
      />
      <View style={style_addTeamForm.btn}>
        <Button title="create the team" onPress={onCreatedTeamClicked} />
      </View>
    </View>
  )
}

export default AddTeamForm
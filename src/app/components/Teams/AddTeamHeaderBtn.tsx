import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { unwrapResult } from '@reduxjs/toolkit'
import { selectTeamTitle, addNewTeam, addTeamTitle } from '../../../features/team/teamSlice'
import { selectNewAddedTeamMembers } from '../../../features/team/teamSlice'
import style_addTeamForm from "./style_addTeamForm";
import { HEADER_BTN_TYPES } from '../NavigationComponents/HeaderButtonEnum';

const AddTeamHeaderBtn = (props) => {
  const teamTitle = useSelector(selectTeamTitle);
  const addedUsers = useSelector(selectNewAddedTeamMembers)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave =
    [teamTitle, addedUsers.length > 0].every(Boolean) && addRequestStatus === 'idle'

  const dispatch = useDispatch()

  const onCreatedTeamClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewTeam({ teamTitle, addedUsers })
        )
        unwrapResult(resultAction)
      } catch (error) {
        console.error('Failed to save the team: ', error)
      } finally {
        setAddRequestStatus('idle')
        props.navigation.navigate('PollTeamStack')
      }
    }
  }

  return (
      <View style={style_addTeamForm.btn}>
        <Button title={HEADER_BTN_TYPES.CREATE} onPress={onCreatedTeamClicked} />
      </View>
  )

  }

export default AddTeamHeaderBtn
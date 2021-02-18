import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button } from 'react-native';
import { unwrapResult } from '@reduxjs/toolkit'
import { selectCurrentPollTitle,
  selectCurrentPollDescription,
  selectCurrentGroup
 } from '../../../../features/polls/pollSlice'
import { HEADER_BTN_TYPES } from '../../NavigationComponents/HeaderButtonEnum';
import { addNewPoll } from '../../../../features/polls/pollSlice';
import stlye_addPollForm from './stlye_addPollForm';

const AddPollHeaderBtn = (props) => {

  const pollTitle = useSelector(selectCurrentPollTitle);
  const pollDescription = useSelector(selectCurrentPollDescription);
  const currentTeamId = useSelector(selectCurrentGroup)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')


  const canSave =
    [pollTitle.trim().length, pollDescription.trim().length, currentTeamId].every(Boolean) && addRequestStatus === 'idle'

  const dispatch = useDispatch()

  const onSavePollClicked = async () => {
    if(canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPoll({pollTitle, pollDescription, currentTeamId})
        )
        unwrapResult(resultAction)
      } catch (error) {
        console.error('Failed to save the poll: ', error)
      } finally {
        setAddRequestStatus('idle')
        props.navigation.navigate('PollsForGroupStack')
      }
    } 
  }

  return (
      <View style={stlye_addPollForm.btn}>
        <Button title={HEADER_BTN_TYPES.CREATE} onPress={onSavePollClicked} disabled={!canSave} />
      </View>
  )

  }

export default AddPollHeaderBtn
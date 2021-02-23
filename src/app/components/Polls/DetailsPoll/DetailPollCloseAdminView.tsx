import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import style_detailsPollForm from './style_detailsPollForm'
import { closePoll } from '../../../../features/polls/pollSlice';
import { selectCurrentPoll } from '../../../../features/polls/pollSlice';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { POLL_FLAG_ENUM } from '../PollList/PollFlagEnum';


const DetailPollCloseAdminView = () => {
  const navigation = useNavigation()
  const [estimation, setEstimation] = useState()
  const [statusClosed, setStatusClose] = useState(false)
  const poll = useSelector(selectCurrentPoll);
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onEstimationChanged = e => setEstimation(e)
  const dispatch = useDispatch()

  const canSave = estimation && addRequestStatus === 'idle'


  const onClosePollClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(closePoll({ poll, estimation }))
      } catch (error) {
        console.error('Failed to close the poll: ', error)
      } finally {
        setAddRequestStatus('idle')
        setStatusClose(true)
        navigation.navigate('PollsForGroupStack')
      }
    }
  }



  const closeButton: JSX.Element =
    <TouchableOpacity
      onPress={onClosePollClicked}
      disabled={!estimation || statusClosed}
      style={style_detailsPollForm.submitRatingBtn}>
      <Text style={style_detailsPollForm.adminRatingBtnLabel}>Close the poll</Text>
    </TouchableOpacity>


    return (
      <View style={style_detailsPollForm.adminviewContainer}>
        {closeButton}
        <TextInput
          editable={!statusClosed}
          placeholder="SP"
          onChangeText={onEstimationChanged}
          numberOfLines={1}
          maxLength={2}
          keyboardType="numeric"
          style={style_detailsPollForm.adminRatingPointsField}
        />
      </View>
    )

}

export default DetailPollCloseAdminView
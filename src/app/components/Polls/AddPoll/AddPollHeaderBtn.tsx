// React specific
import React from 'react'
import { View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectUser } from '../../../../features/users/userSlice'
import { selectCurrentPollTitle,
  selectCurrentPollDescription,
  selectCurrentTeam
 } from '../../../../features/polls/pollSlice'
import { addNewPoll } from '../../../../features/polls/pollSlice'
import stlye_addPollForm from './stlye_addPollForm'

// Enum
import { HEADER_BTN_TYPES } from '../../NavigationComponents/HeaderButtonEnum'
import { POLL_FLAG_ENUM } from '../PollList/PollFlagEnum'

// Models
import { Poll } from '../../../models/Poll'



const AddPollHeaderBtn = (): JSX.Element => {
  const navigation = useNavigation()
  const currentUser = useAppSelector(selectUser)
  const title = useAppSelector(selectCurrentPollTitle)
  const description = useAppSelector(selectCurrentPollDescription)
  const currentTeam = useAppSelector(selectCurrentTeam)


  const canSave =
    [title.trim().length, description.trim().length, currentTeam, currentUser].every(Boolean)

  const dispatch = useAppDispatch()

  const onSavePollClicked = async () => {
    if(canSave && currentUser !== null) {
      try {
        const poll = new Poll(
          '',
          currentTeam.teamId,
          title,
          description,
          currentUser.uid,
          POLL_FLAG_ENUM.OPEN
        )
        await dispatch(
          addNewPoll(poll)
        )
      } catch (error) {
        console.error('Failed to save the poll: ', error)
      } finally {
        navigation.navigate('PollsForGroupStack')
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
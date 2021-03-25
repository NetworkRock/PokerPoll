// React specific
import React, { useEffect } from 'react'
import { Text, View, FlatList, StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Redux
import { selectAllOpenAndVotedPollsForOneTeam, pollAdded, exchangeModifiedPollToExistingPoll } from '../../../../features/polls/pollSlice'
import { selectCurrentTeam } from '../../../../features/polls/pollSlice'
import { selectAllTeams } from '../../../../features/team/teamSlice'

// Components
import renderPollListItem from './PollListItem'

// Style
import stylePollList from './style_pollList'

// Firebase
import { firebaseApp } from '../../../../../config'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { status } from '../../../enums/StatusEnum'




const PollsList = (): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const currentTeamId = useAppSelector(selectCurrentTeam)
  const teams = useAppSelector(selectAllTeams)
  const polls = useAppSelector((state) => selectAllOpenAndVotedPollsForOneTeam(state, currentTeamId))
  const pollStatus = useAppSelector(state => state.polls.status)
  const error = useAppSelector(state => state.polls.error)

  useEffect(() => {
    const db = firebaseApp.firestore()
    /**
     * Listen when somebody creates a new poll
     */
    if (currentTeamId !== null) {
      const unsubscribe = db.collection('poll')
      .doc(currentTeamId.teamId)
      .collection('polls')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().map((change) => {
          if (change.type == 'added') {
            console.info('added DATA: ', change.doc.data())
            dispatch(pollAdded(change.doc.data()))
          }
          if (change.type == 'modified') {
            console.info('modified DATA: ', change.doc.data())
            dispatch(exchangeModifiedPollToExistingPoll(change.doc.data()))
          }
          if (change.type == 'removed') {
            console.info('removed DATA: ', change.doc.data())
          }
        })
      })
    return unsubscribe
    }
  }, [])

  let content

  if (pollStatus === status.loading) {
    content = <Text>Loading...</Text>
  } else if (pollStatus === status.succeeded) {
    content = <View style={stylePollList.listContainer}>
      <StatusBar
        barStyle='dark-content'
        hidden={false}
        backgroundColor='#00BCD4'
        translucent={true}
      />
      <FlatList
        data={polls}
        renderItem={(poll) => renderPollListItem(poll, navigation, dispatch, teams)}
        keyExtractor={(poll) => poll.pollId}
      />
    </View>
  } else if (pollStatus === status.failed) {
    content = <View>{error}</View>
  }

  return (
    <View style={stylePollList.listContainer}>{content}</View>
  )
}

export default PollsList
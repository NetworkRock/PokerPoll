// React specific
import React, { useEffect } from 'react'
import { Text, View, FlatList, StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Redux
import { selectAllOpenAndVotedPollsForOneTeam, pollAdded, exchangeModifiedPollToExistingPoll } from '../../../../features/polls/pollSlice'
import { ratingAdded, exchangeModifiedRatingToExistingRating } from '../../../../features/polls/rateSlice'
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
  const rootState = useAppSelector((state) => state)
  const currentTeam = useAppSelector(selectCurrentTeam)
  const polls = useAppSelector((state) => selectAllOpenAndVotedPollsForOneTeam(state, currentTeam))
  const pollStatus = useAppSelector(state => state.polls.status)
  const error = useAppSelector(state => state.polls.error)

  useEffect(() => {
    const db = firebaseApp.firestore()
    /**
     * Listen when something happends with a poll
     * or a new one is created
     */
    if (currentTeam !== null) {
      const unsubscribe = db.collection('poll')
      .doc(currentTeam?.teamId)
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

  useEffect(() => {
    const db = firebaseApp.firestore()
    /**
     * Listen when something happens with a rating
     * or a new rating is fired
     */
      const unsubscribe = db.collection('teams')
      .doc(currentTeam?.teamId)
      .collection('userRatings')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().map((change) => {
          if (change.type == 'added') {
            console.info('added rating DATA: ', change.doc.data())
            dispatch(ratingAdded(change.doc.data()))
          }
          if (change.type == 'modified') {
            console.info('modified rating DATA: ', change.doc.data())
            dispatch(exchangeModifiedRatingToExistingRating(change.doc.data()))
          }
          if (change.type == 'removed') {
            console.info('removed rating DATA: ', change.doc.data())
          }
        })
      })
    return unsubscribe
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
        renderItem={(poll) => renderPollListItem(poll, navigation, dispatch, rootState, currentTeam)}
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
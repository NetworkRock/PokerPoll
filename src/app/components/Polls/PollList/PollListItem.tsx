// React specific
import React from 'react'
import { TouchableHighlight, View, Text, ListRenderItemInfo } from 'react-native'

// Redux
import { addCurrentSelectedPoll } from '../../../../features/polls/pollSlice'
import { selectAllUserRatingsForOnePoll } from '../../../../features/polls/rateSlice'
import { fetchAllUsersBytheirRatings } from '../../../../features/users/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'

// Style
import stylePollList from './style_pollList'

// Icons
import Icon from 'react-native-vector-icons/SimpleLineIcons'

// Components
import AnimatedShowVoteView from './AnimateShowVoteView'

// Enum
import { POLL_FLAG_ENUM } from './PollFlagEnum'
import { AppDispatch, RootState } from '../../../store'

// Models
import { Poll } from '../../../models/Poll'

import { Rating } from '../../../models/Rating'
import { Team } from '../../../models/Team'

const renderPollListItem = (
  poll: ListRenderItemInfo<Poll>,
  navigation,
  dispatch: AppDispatch,
  rootState: RootState,
  team: Team | null): JSX.Element => {


  // All team members --> works because all team member can rate all polls
  const allTeamMembersNumber: number | undefined = team?.members.length
  const userRatingsForOnePoll: Array<Rating> = selectAllUserRatingsForOnePoll(rootState, poll.item)
  const alreadyVotedMembersNumber: number = userRatingsForOnePoll.length


  const onPollListItemClicked = async () => {
    try {
      await dispatch(addCurrentSelectedPoll(poll.item))
      if (poll.item.pollFlag === POLL_FLAG_ENUM.VOTED || poll.item.pollFlag === POLL_FLAG_ENUM.CLOSE) {
        const resultAction = await dispatch(fetchAllUsersBytheirRatings(userRatingsForOnePoll))
        const firebaseUsersWhichRated: Array<firebase.User> = unwrapResult(resultAction)
        navigation.navigate('PollsDetailStack', { screen: 'PollsDetailResultScreen', params: { users: firebaseUsersWhichRated, poll: poll } })
      } else {
        navigation.navigate('PollsDetailStack', { screen: 'PollsDetailScreen' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const voteNumberIncreaseView: JSX.Element =
      <AnimatedShowVoteView><Text style={{ fontSize: 22, }}>{alreadyVotedMembersNumber}</Text></AnimatedShowVoteView>
  
  const openPollListItemLayout: JSX.Element = <TouchableHighlight
    key={poll.item.pollId}
    onPress={onPollListItemClicked}>
    <View style={stylePollList.listItem}>
      <View style={stylePollList.listItemContainerWithoutImage}>
        <Text numberOfLines={1} style={stylePollList.title}>{poll.item.title}</Text>
      </View>
      <View style={stylePollList.iconInListContainer}>
        <Text>{voteNumberIncreaseView} / {allTeamMembersNumber}
        </Text>
        <Icon name='lock-open' color='#59bf50' size={30} />
      </View>
    </View>
  </TouchableHighlight>

  const votedPollListItemLayout: JSX.Element = <TouchableHighlight
    key={poll.item.pollId}
    onPress={onPollListItemClicked}>
    <View style={stylePollList.listItem}>
      <View style={stylePollList.listItemContainerWithoutImage}>
        <Text numberOfLines={1} style={stylePollList.title}>{poll.item.title}</Text>
      </View>
      <View style={stylePollList.iconInListContainer}>
        <Text>{alreadyVotedMembersNumber} / {allTeamMembersNumber}</Text>
        <Icon name='lock' color='gray' size={30} />
      </View>
    </View>
  </TouchableHighlight>


  const closedPollListItemLayout: JSX.Element = <TouchableHighlight
    key={poll.item.pollId}
    onPress={onPollListItemClicked}>
    <View style={stylePollList.listItem}>
      <View style={stylePollList.listItemContainerWithoutImage}>
        <Text numberOfLines={1} style={stylePollList.title}>{poll.item.title}</Text>
      </View>
      <View style={stylePollList.iconInListContainer}>
        <Text style={{fontSize: 20}}>{poll.item.finalEstimationNumber}</Text>
      </View>
    </View>
  </TouchableHighlight>




  if (poll.item.pollFlag === POLL_FLAG_ENUM.OPEN) {
    return (
      openPollListItemLayout
    )
  } else if (poll.item.pollFlag === POLL_FLAG_ENUM.VOTED) {
    return (
      votedPollListItemLayout
    )
  } else {
    return (
      closedPollListItemLayout
    )
  }


}

export default renderPollListItem
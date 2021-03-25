// React specific
import React from 'react'
import { TouchableHighlight, View, Text, ListRenderItemInfo } from 'react-native'

// Redux
import { addCurrentSelectedPoll } from '../../../../features/polls/pollSlice'
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
import { AppDispatch } from '../../../store'

// Models
import { Poll } from '../../../models/Poll'

const renderPollListItem = (poll: ListRenderItemInfo<Poll>, navigation, dispatch: AppDispatch, allTeams): JSX.Element => {

  const alreadyVotedMembersNumber: Number = poll.userRatings.length
  let inivitedMembersForTheTeam: Array<Object> = []
  let inivitedMembersForTheTeamNumber: Number = 0

  /**
   * Find the right group to find the invited members
   */
  allTeams.map((el) => {
    if (poll.groupId === el.id) {
      inivitedMembersForTheTeamNumber = el.addedUsersId.length
      inivitedMembersForTheTeam = el.addedUsersId
    }
  })


  const onPollListItemClicked = async () => {
    try {
      await dispatch(addCurrentSelectedPoll(poll))
      if (poll.pollFlag === POLL_FLAG_ENUM.VOTED || poll.pollFlag === POLL_FLAG_ENUM.CLOSE) {
        const resultAction = await dispatch(fetchAllUsersBytheirRatings(poll.userRatings))
        unwrapResult(resultAction)
        navigation.navigate('PollsDetailStack', { screen: 'PollsDetailResultScreen', params: { users: resultAction.payload, poll: poll } })
      } else {
        navigation.navigate('PollsDetailStack', { screen: 'PollsDetailScreen' })
      }
    } catch (error) {
      console.error(error)
    }
  }

  let voteNumberIncreaseView: JSX.Element

  // Check how to listen when to fire the animation
  if (true) {
    voteNumberIncreaseView =
      <AnimatedShowVoteView>
        <Text style={{ fontSize: 22, }}>{alreadyVotedMembersNumber}</Text>
      </AnimatedShowVoteView>
  } else {
    voteNumberIncreaseView =
      <Text style={{ fontSize: 22, }}>{alreadyVotedMembersNumber}</Text>
  }




  const openPollListItemLayout: JSX.Element = <TouchableHighlight
    key={poll.currentTeamId}
    onPress={onPollListItemClicked}>
    <View style={stylePollList.listItem}>
      <View style={stylePollList.listItemContainerWithoutImage}>
        <Text numberOfLines={1} style={stylePollList.title}>{poll.pollTitle}</Text>
      </View>
      <View style={stylePollList.iconInListContainer}>
        <Text>{voteNumberIncreaseView} / {inivitedMembersForTheTeamNumber}
        </Text>
        <Icon name='lock-open' color='#59bf50' size={30} />
      </View>
    </View>
  </TouchableHighlight>

  const votedPollListItemLayout: JSX.Element = <TouchableHighlight
    key={poll.currentTeamId}
    onPress={onPollListItemClicked}>
    <View style={stylePollList.listItem}>
      <View style={stylePollList.listItemContainerWithoutImage}>
        <Text numberOfLines={1} style={stylePollList.title}>{poll.pollTitle}</Text>
      </View>
      <View style={stylePollList.iconInListContainer}>
        <Text>{alreadyVotedMembersNumber} / {inivitedMembersForTheTeamNumber}</Text>
        <Icon name='lock' color='gray' size={30} />
      </View>
    </View>
  </TouchableHighlight>


  const closedPollListItemLayout: JSX.Element = <TouchableHighlight
    key={poll.currentTeamId}
    onPress={onPollListItemClicked}>
    <View style={stylePollList.listItem}>
      <View style={stylePollList.listItemContainerWithoutImage}>
        <Text numberOfLines={1} style={stylePollList.title}>{poll.pollTitle}</Text>
      </View>
      <View style={stylePollList.iconInListContainer}>
        <Text style={{fontSize: 20}}>{poll.pollEstimation}</Text>
      </View>
    </View>
  </TouchableHighlight>




  if (poll.pollFlag === POLL_FLAG_ENUM.OPEN) {
    return (
      openPollListItemLayout
    )
  } else if (poll.pollFlag === POLL_FLAG_ENUM.VOTED) {
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
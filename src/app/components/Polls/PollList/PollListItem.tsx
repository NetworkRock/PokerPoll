import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import stylePollList from "./style_pollList";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { addCurrentSelectedPoll } from '../../../../features/polls/pollSlice';
import AnimatedShowVoteView from './AnimateShowVoteView';
import { POLL_FLAG_ENUM } from './PollFlagEnum';
import { fetchAllUsersBytheirRatings } from '../../../../features/users/userSlice';
import { unwrapResult } from '@reduxjs/toolkit'


const renderPollListItem = ({ item }, navigation, dispatch, allTeams) => {

  const alreadyVotedMembersNumber: Number = item.userRatings.length
  let inivitedMembersForTheTeam: Array<Object> = []
  let inivitedMembersForTheTeamNumber: Number = 0

    /**
     * Find the right group to find the invited members
     */
    allTeams.map((el) => {
      if (item.groupId === el.id) {
        inivitedMembersForTheTeamNumber = el.addedUsersId.length
        inivitedMembersForTheTeam = el.addedUsersId
      }
    })


  const onPollListItemClicked = async () => {
    try {
      await dispatch(addCurrentSelectedPoll(item));
      if (item.pollFlag === POLL_FLAG_ENUM.VOTED || item.pollFlag === POLL_FLAG_ENUM.CLOSE) {
        const resultAction = await dispatch(fetchAllUsersBytheirRatings(item.userRatings))
        unwrapResult(resultAction)
        navigation.navigate('PollsDetailStack', { screen: 'PollsDetailResultScreen', params: { users: resultAction.payload, poll: item} });
      } else {
        navigation.navigate('PollsDetailStack', { screen: 'PollsDetailScreen' });
      }
    } catch (error) {
      console.error(error)
    }
  }

  let voteNumberIncreaseView: JSX.Element

  //Check how to listen when to fire the animation
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
    key={item.currentTeamId}
    onPress={onPollListItemClicked}>
    <View style={stylePollList.listItem}>
      <View style={stylePollList.listItemContainerWithoutImage}>
        <Text numberOfLines={1} style={stylePollList.title}>{item.pollTitle}</Text>
      </View>
      <View style={stylePollList.iconInListContainer}>
        <Text>{voteNumberIncreaseView} / {inivitedMembersForTheTeamNumber}
        </Text>
        <Icon name='lock-open' color="#59bf50" size={30} />
      </View>
    </View>
  </TouchableHighlight>

  const votedPollListItemLayout: JSX.Element = <TouchableHighlight
    key={item.currentTeamId}
    onPress={onPollListItemClicked}>
    <View style={stylePollList.listItem}>
      <View style={stylePollList.listItemContainerWithoutImage}>
        <Text numberOfLines={1} style={stylePollList.title}>{item.pollTitle}</Text>
      </View>
      <View style={stylePollList.iconInListContainer}>
        <Text>{alreadyVotedMembersNumber} / {inivitedMembersForTheTeamNumber}</Text>
        <Icon name='lock' color="gray" size={30} />
      </View>
    </View>
  </TouchableHighlight>




  if(item.pollFlag === POLL_FLAG_ENUM.OPEN) {
    return (
      openPollListItemLayout
    );
  } else if(item.pollFlag === POLL_FLAG_ENUM.VOTED || item.pollFlag === POLL_FLAG_ENUM.CLOSE) {
    return (
      votedPollListItemLayout
    );
  }


};

export default renderPollListItem
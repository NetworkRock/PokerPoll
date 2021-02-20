import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import stylePollList from "./style_pollList";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { addCurrentSelectedPoll } from '../../../../features/polls/pollSlice';
import AnimatedShowVoteView from './AnimateShowVoteView';

let recentVote: Number = 0;

const renderPollListItem = ({ item }, navigation, dispatch, allTeams) => {


  const alreadyVotedMembersNumber: Array<Object> = item.userRatings.length
  let inivitedMembersForTheTeam: Array<String> = [] 
  /**
   * Find the right group to find the invited members
   */
  allTeams.map((el) => {
    if(item.groupId === el.id)
    {
      inivitedMembersForTheTeam = el.addedUsersId
    }
  })
  const inivitedMembersForTheTeamNumber: Number = inivitedMembersForTheTeam.length

  console.log("MEMBERS OF THE TEAM: ", inivitedMembersForTheTeam)

  const onPollListItemClicked = () => {
    console.log("CLICKED");
    try {
      dispatch(addCurrentSelectedPoll(item));
    } catch (error) {
      console.error(error)
    } finally {
      console.log("CLICKED");
      navigation.navigate('PollsDetailStack');
    }
  }

  let voteNumberIncreaseView: JSX.Element

  //Check how to listen when to fire the animation
  if(true) {
    voteNumberIncreaseView = 
    <AnimatedShowVoteView>
     <Text style={{ fontSize: 22,}}>{alreadyVotedMembersNumber}</Text>
    </AnimatedShowVoteView>
  } else {
    voteNumberIncreaseView = 
     <Text style={{ fontSize: 22,}}>{alreadyVotedMembersNumber}</Text>
  }


    

  const standartLayout: JSX.Element = <TouchableHighlight
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


    return (
      standartLayout
    );

};

export default renderPollListItem
import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import stylePollList from "./style_pollList";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { addCurrentSelectedPoll } from '../../../../features/polls/pollSlice';

const renderPollListItem = ({ item }, navigation, dispatch) => {



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



  return (
    <TouchableHighlight
      key={item.currentTeamId}
      onPress={onPollListItemClicked}>
      <View style={stylePollList.listItem}>
        <View style={stylePollList.listItemContainerWithoutImage}>
          <Text numberOfLines={1} style={stylePollList.title}>{item.pollTitle}</Text>
          <Text numberOfLines={3} style={stylePollList.description}>{item.pollDescription}</Text>
        </View>
        <View style={stylePollList.iconInListContainer}>
          <Icon name='lock-open' color="green" size={35} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default renderPollListItem
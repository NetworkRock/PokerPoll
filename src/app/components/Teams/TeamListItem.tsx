import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import style_teamList from "./style_teamList";
import { addCurrentSelectedGroup } from '../../../features/polls/pollSlice';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const renderTeamListItem = ({ item }: Object, navigation, dispatch) => {
  const onAddCurrentSelectedGroup = () => {
    try {
      dispatch(addCurrentSelectedGroup(item.id));
    } catch (error) {
      console.error(error)
    } finally {
      navigation.navigate('PollsForGroupStack');
    }
  }

  return (
    <TouchableHighlight
      key={item.id}
      onPress={onAddCurrentSelectedGroup}>
      <View style={style_teamList.listItem}>
        <View style={style_teamList.listItemContainerWithoutImage}>
          <Text style={style_teamList.title}>{item.teamTitle}</Text>
        </View>
        <View style={style_teamList.iconInListContainer}>
            <Icon name="account-group" size={35} color="white" />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default renderTeamListItem
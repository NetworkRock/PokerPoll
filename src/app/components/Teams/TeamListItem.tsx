import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import style_teamList from "./style_teamList";
import { addCurrentSelectedGroup } from '../../../features/polls/pollSlice';

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
          <Text>{item.teamTitle}</Text>
          <Text>{item.createdBy}</Text>
          <Text>{item.id}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default renderTeamListItem
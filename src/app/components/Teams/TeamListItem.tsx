import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import style_teamList from "./style_teamList";


const renderTeamListItem = ({ item }: Object, navigation) => {

  

  return (
    <TouchableHighlight
      key={item.id}
      onPress={() => {
        navigation.navigate('PollsForGroupStack');
      }}>
      <View style={style_teamList.listItem}>
        <View style={style_teamList.listItemContainerWithoutImage}>
          <Text>{item.teamTitle}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default renderTeamListItem
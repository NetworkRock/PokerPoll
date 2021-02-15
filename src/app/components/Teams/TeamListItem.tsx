import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import style_teamList from "./style_teamList";

const renderTeamListItem = ({item}: Object) => {
  return (
      <TouchableHighlight
        key={item.id}
        onPress={() => {}}>
        <View style={style_teamList.listItem}>
          <Text>{item.title}</Text>
        </View>
      </TouchableHighlight>
  );
};

export default renderTeamListItem
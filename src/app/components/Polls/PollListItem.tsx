import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import stylePollList from "./style_pollList";

const renderPollListItem = ({item}: Object) => {
  return (
      <TouchableHighlight
        onPress={() => {}}>
        <View style={stylePollList.listItem}>
          <Text>{item.id} - {item.title}</Text>
        </View>
      </TouchableHighlight>
  );
};

export default renderPollListItem
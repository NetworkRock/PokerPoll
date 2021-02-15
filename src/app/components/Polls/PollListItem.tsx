import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import stylePollList from "./style_pollList";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const renderPollListItem = ({ item }: Object) => {
  return (
    <TouchableHighlight
      key={item.currentTeamId}
      onPress={() => { }}>
      <View style={stylePollList.listItem}>
        <View style={stylePollList.listItemContainerWithoutImage}>
          <Text style={stylePollList.title}>{item.title}</Text>
          <Text numberOfLines={4} style={stylePollList.description}>{item.description}</Text>
        </View>
        <View style={stylePollList.iconInListContainer}>
          <Icon name='lock-open' color="green" size={35} />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default renderPollListItem
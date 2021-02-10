import React from 'react';
import { useSelector } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import renderPollListItem from './PollListItem'
import stylePollList from './style_pollList';

const FlatListHeader = () => {
  return (
    <View>
      <Text style={stylePollList.headerTitle}>Polls</Text>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#C8C8C8"
        style={stylePollList.searchField}
      ></TextInput>
    </View>
  );
};

const SearchPollsList = () => {
  const polls = useSelector(state => state.polls)
  // Test log for what the useSelector returns
  console.log(polls);
  return (
    <View style={stylePollList.listContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        translucent={true}
      />
      <FlatList
        ListHeaderComponent={FlatListHeader}
        ListHeaderComponentStyle={stylePollList.flatListHeader}
        data={polls}
        renderItem={(item) => renderPollListItem(item)}
        keyExtractor={polls.id}
      />
    </View>
  );
}

export default SearchPollsList
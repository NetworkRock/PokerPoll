import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import renderPollListItem from './PollListItem'
import stylePollList from './style_pollList';
import { selectAllPolls, fetchPollsByGroupId } from '../../../features/polls/pollSlice'
import { selectCurrentGroup} from '../../../features/polls/pollSlice'

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
  const dispatch = useDispatch();
  const currentTeamId = useSelector(selectCurrentGroup)
  const polls = useSelector(selectAllPolls)
  const pollStatus = useSelector(state => state.polls.status)
  const error = useSelector(state => state.polls.error)

  useEffect(() => {
    if(pollStatus === 'idle') {
      dispatch(fetchPollsByGroupId({currentTeamId}))
    }
  }, [pollStatus, dispatch])

  let content

  if(pollStatus === 'loading') {
    content = <Text>Loading...</Text>
  } else if (pollStatus === 'succeeded') {
    content = <View style={stylePollList.listContainer}>
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
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
  } else if (pollStatus === 'failed') {
    content = <View>{error}</View>
  }

  return (
    <View style={stylePollList.listContainer}>{content}</View>
  );
}

export default SearchPollsList
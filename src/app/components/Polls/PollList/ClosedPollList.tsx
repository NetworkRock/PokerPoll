import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import renderPollListItem from './PollListItem'
import stylePollList from './style_pollList';
import { selectAllPollsWhichAreClosed } from '../../../../features/polls/pollSlice'
import { useNavigation } from '@react-navigation/native';
import { selectAllTeams } from '../../../../features/team/teamSlice'


const ClosedPollsList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allClosedPolls = useSelector((state) => selectAllPollsWhichAreClosed(state))
  const allTeamsWhereCurrentUserIsMember = useSelector(selectAllTeams)

  return (
      <View style={stylePollList.listContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={true}
        />
        <FlatList
          data={allClosedPolls}
          renderItem={(item) => renderPollListItem(item, navigation, dispatch, allTeamsWhereCurrentUserIsMember)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
  );
}

export default ClosedPollsList
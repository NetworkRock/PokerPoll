import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import { selectAllTeams, fetchAllTeamsForOneUser } from '../../../features/team/teamSlice'
import style_teamList from './style_teamList';
import renderTeamListItem from './TeamListItem';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentUser } from '../../../features/users/userSlice'

const TeamList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const teams = useSelector(selectAllTeams)
  const currentUser = useSelector(selectCurrentUser)
  const teamStatus = useSelector(state => state.teams.status)
  const error = useSelector(state => state.teams.error)

  useEffect(() => {
    if(teamStatus === 'idle') {
      dispatch(fetchAllTeamsForOneUser({currentUser}))
    }
  }, [teams, teamStatus, dispatch])

  let content

  if(teamStatus === 'loading') {
    content = <Text>Loading...</Text>
  } else if (teamStatus === 'succeeded') {
    content = <View style={style_teamList.listContainer}>
    <StatusBar
      barStyle="dark-content"
      hidden={false}
      backgroundColor="#00BCD4"
      translucent={true}
    />
    <FlatList
      data={teams}
      renderItem={(item) => renderTeamListItem(item, navigation)}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
  } else if (teamStatus === 'failed') {
    content = <View>{error}</View>
  }

  return (
    <View style={style_teamList.listContainer}>{content}</View>
  );
}

export default TeamList
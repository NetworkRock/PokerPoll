import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import renderTeamListItem from './UserListItem'
import style_userForm from './style_userForm';
import { selectAllFilteredUsers ,fetchUserListById } from '../../../features/users/userSlice'
import { addMemberToNewTeam, selectNewAddedTeamMembers } from '../../../features/team/teamSlice';

const UserSearchList = () => {
  const searchTitle = useSelector(state => state.user.titleOfDisplayNameUserSearch)
  const filteredUsers = useSelector(selectAllFilteredUsers)
  const userStatus = useSelector(state => state.user.status)
  const error = useSelector(state => state.user.error)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserListById({ searchTitle }))
  }, [searchTitle, dispatch])

  let content
  if (userStatus === 'loading') {
    content = <View style={style_userForm.container}><Text>Loading...</Text></View>
  } else if (userStatus === 'succeeded') {
    content = <View style={style_userForm.listContainer}>
    <StatusBar
      barStyle="dark-content"
      hidden={false}
      backgroundColor="#00BCD4"
      translucent={true}
    />
    <FlatList
      data={filteredUsers}
      renderItem={(item) => renderTeamListItem(item, dispatch)}
      keyExtractor={(item) => item.id.toString()}
    />
  </View>
  } else if (userStatus === 'failed') {
    content = <View>{error}</View>
  }

  return (
    <View style={style_userForm.listContainer}>{content}</View>
  );
}

export default UserSearchList
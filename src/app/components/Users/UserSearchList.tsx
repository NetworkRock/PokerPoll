import React, { useEffect } from 'react';
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

const UserSearchList = () => {
  const dispatch = useDispatch();
  const searchTitle = useSelector(state => state.user.titleOfDisplayNameUserSearch)
  const filteredUsers = useSelector(selectAllFilteredUsers)
  const userStatus = useSelector(state => state.user.status)
  const error = useSelector(state => state.user.error)

  useEffect(() => {
      dispatch(fetchUserListById({searchTitle}))
  }, [searchTitle, dispatch])

  let content
  if(userStatus === 'loading') {
    content = <Text>Loading...</Text>
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
      keyExtractor={(item, index) => index.toString()}
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
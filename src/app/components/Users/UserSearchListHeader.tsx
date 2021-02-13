import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import renderTeamListItem from './UserListItem'
import style_userForm from './style_userForm';
import { addSearchUserTitle, selectAllFilteredUsers, fetchUserListById } from '../../../features/users/userSlice'

const UserSearchListHeader = () => {
  const dispatch = useDispatch()
  
  const onSearchTitleChanged = searchName => {
    if (searchName) {
      dispatch(addSearchUserTitle(searchName))
    }
  }

  return (
    <View style={style_userForm.searchListHeader}>
      <Text style={style_userForm.headerTitle}>User Search</Text>
      <TextInput
        placeholder="Search for a user"
        placeholderTextColor="#C8C8C8"
        style={style_userForm.searchField}
        onChangeText={onSearchTitleChanged}
      />
    </View>
  );
};

export default UserSearchListHeader
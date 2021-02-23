import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import style_userForm from './style_userForm';
import { addSearchUserTitle } from '../../../features/users/userSlice'

const UserSearchListHeader = () => {
  const dispatch = useDispatch()

  const onSearchTitleChanged = searchName => {
    if (searchName) {
      dispatch(addSearchUserTitle(searchName))
    }
  }

  return (
    <View style={style_userForm.searchListHeader}>
      <TextInput
        placeholder="Username (Case sensitive)"
        placeholderTextColor="#C8C8C8"
        style={style_userForm.searchField}
        onChangeText={onSearchTitleChanged}
      />
    </View>
  );
};

export default UserSearchListHeader
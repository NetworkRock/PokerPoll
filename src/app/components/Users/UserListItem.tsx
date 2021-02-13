import React from 'react';
import { TouchableHighlight, View, Text, Image } from 'react-native';
import { unwrapResult } from '@reduxjs/toolkit'
import style_userForm from './style_userForm';
import { addMemberToNewTeam } from '../../../features/team/teamSlice';

const renderUserListItem = ({ item }: Object, dispatch: Dispatch<any>) => {


  const onAddMemberClicked = async () => {
    try {
      const resultAction = await dispatch(addMemberToNewTeam(item))
      unwrapResult(resultAction)

    } catch (error) {
      console.error('Failed to add member to group: ', error)
    } finally {
    }
  }

  return (
    <TouchableHighlight
      onPress={onAddMemberClicked}>
      <View style={style_userForm.listItem}>
      <Image source={{
          uri: item.profilePictureURL,
        }} style={style_userForm.iconInList} />
        <Text>{item.displayName}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default renderUserListItem
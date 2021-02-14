import React, {useEffect} from 'react';
import { TouchableHighlight, View, Text, Image, Button } from 'react-native';
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
        <View style={style_userForm.iconInListContainer} >
          <Image source={{
            uri: item.profilePictureURL,
          }} style={style_userForm.iconInList} />
        </View>
        <View style={style_userForm.listItemContainerWithoutImage}>
          <Text style={style_userForm.displayNameInUserSearchList}>{item.displayName}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default renderUserListItem
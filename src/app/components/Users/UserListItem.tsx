import React, {useEffect} from 'react';
import { useSelector } from 'react-redux'
import { TouchableHighlight, View, Text, Image, Button } from 'react-native';
import { unwrapResult } from '@reduxjs/toolkit'
import style_userForm from './style_userForm';
import { addMemberToNewTeam, selectNewAddedTeamMembers } from '../../../features/team/teamSlice';

const renderUserListItem = ({ item }, dispatch) => {
  

  const onAddMemberClicked = () => {
      try {
        dispatch(addMemberToNewTeam(item));
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <TouchableHighlight
      key={item.id.toString()}
      onPress={onAddMemberClicked}
      >
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
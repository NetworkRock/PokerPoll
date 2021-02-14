import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TouchableHighlight, View, Text, Image, Button } from 'react-native';
import { unwrapResult } from '@reduxjs/toolkit'
import style_userForm from './style_userForm';
import { selectNewAddedTeamMembers } from '../../../features/team/teamSlice';


const renderUserListItem = ({ item }, setMemberList, memberList, tempMemberList) => {
  const onAddMemberClicked = () => {
    if(!tempMemberList.includes(item)) {
      tempMemberList.push(item);
    } else {
      const indexOfItemForDeletion = tempMemberList.indexOf(item);
      tempMemberList.splice(indexOfItemForDeletion, 1);
    }
    tempMemberList.length <= 0 ? setMemberList([]) : setMemberList([...memberList, ...tempMemberList])
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
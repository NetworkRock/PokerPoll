import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Image,
  View,
  ScrollView,
} from 'react-native';
import style_userForm from './style_userForm';
import { selectNewAddedTeamMembers } from '../../../features/team/teamSlice'

const UserSearchListAddedMemebersHeader = () => {
  const addedUsers = useSelector(selectNewAddedTeamMembers)

  let imageArray

  imageArray = addedUsers.map((user) => (
    <Image key={user.id} source={{
      uri: user.profilePictureURL,
    }} style={style_userForm.iconInAddMemberHeader} />
  ))


  if (imageArray.length > 0) {
    return (
      <View style={{flex: 1, flexGrow: 2, alignSelf: 'stretch'}}>
      <ScrollView horizontal={true} alwaysBounceHorizontal={false} contentContainerStyle={style_userForm.scrollViewAddMembersToPollScreen} style={{flex: 1, flexGrow: 1}}>
        {imageArray}
      </ScrollView>
      </View>
    )
  } else {
    return (<View></View>)
  }

}
export default UserSearchListAddedMemebersHeader
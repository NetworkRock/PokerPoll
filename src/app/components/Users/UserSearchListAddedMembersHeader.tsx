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



  return addedUsers.map((user) => (
      <Image source={{
            uri: user.profilePictureURL,
          }} style={style_userForm.iconInAddMemberHeader} />
  ))}

export default UserSearchListAddedMemebersHeader
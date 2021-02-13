import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import style_userForm from './style_userForm';

const UserSearchListAddedMemebersHeader = () => {

  return (
    <View style={style_userForm.addedMembersScrollView}>
      <ScrollView horizontal={true} alwaysBounceHorizontal={false} >
        <Text>
        Lorem ipsum dolor sit
        </Text>
      </ScrollView>
    </View>
  );
};

export default UserSearchListAddedMemebersHeader
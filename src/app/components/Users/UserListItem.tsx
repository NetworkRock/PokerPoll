import React from 'react';
import { TouchableHighlight, View, Text, Alert } from 'react-native';
import { unwrapResult } from '@reduxjs/toolkit'
import styleTeamList from "../Teams/style_teamList";
import { addMemberToNewTeam } from '../../../features/team/teamSlice';

const renderUserListItem = ({ item }: Object, dispatch: Dispatch<any>) => {


  const onAddMemberClicked = async () => {
    try {
      const resultAction = await dispatch(addMemberToNewTeam(item))
      unwrapResult(resultAction)
      Alert.alert(resultAction.payload.displayName);

    } catch (error) {
      console.error('Failed to add member to group: ', error)
    } finally {
    }
  }

  return (
    <TouchableHighlight
      onPress={onAddMemberClicked}>
      <View style={styleTeamList.listItem}>
        <Text>{item.displayName}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default renderUserListItem
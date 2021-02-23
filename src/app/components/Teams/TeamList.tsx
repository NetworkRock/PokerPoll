import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import { selectAllTeams, addTeamToAllTeams, exchangeModifiedTeamToExistingTeam } from '../../../features/team/teamSlice'
import style_teamList from './style_teamList';
import renderTeamListItem from './TeamListItem';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentUser } from '../../../features/users/userSlice'
import { firebaseApp } from "../../../../config";
import { current } from '@reduxjs/toolkit';


const TeamList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const teams = useSelector(selectAllTeams)
  const currentUser = useSelector(selectCurrentUser)
  const teamStatus = useSelector(state => state.teams.status)
  const error = useSelector(state => state.teams.error)

  useEffect(() => {
    const db = firebaseApp.firestore();
    const unsubscribe = db.collection('teams')
      .where('addedUsersId', 'array-contains', currentUser.id).onSnapshot((snapshot) => {
        snapshot.docChanges().map((change) => {
          if (change.type == 'added') {
            console.info("added DATA: ", change.doc.data())
            dispatch(addTeamToAllTeams(change.doc.data()))
          }
          if (change.type == 'modified', change.doc.data()) {
            console.info("modified DATA: ", change.doc.data())
            dispatch(exchangeModifiedTeamToExistingTeam(change.doc.data()))
          }
          if (change.type == 'removed') {
            console.info("removed DATA: ", change.doc.data())
          }
        })
      })
    return unsubscribe;
  }, [])

  let content

  if (teamStatus === 'loading') {
    content = <Text>Loading...</Text>
  } else if (teamStatus === 'succeeded') {
    content = <View style={style_teamList.listContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        translucent={true}
      />
      <FlatList
        data={teams}
        renderItem={(item) => renderTeamListItem(item, navigation, dispatch)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  } else if (teamStatus === 'failed') {
    content = <View>{error}</View>
  }

  return (
    <View style={style_teamList.listContainer}>{content}</View>
  );
}

export default TeamList
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import { selectAllTeams, addTeamToAllTeams } from '../../../features/team/teamSlice'
import style_teamList from './style_teamList';
import renderTeamListItem from './TeamListItem';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentUser } from '../../../features/users/userSlice'
import { firebaseApp } from "../../../../config";


const TeamList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const teams = useSelector(selectAllTeams)
  const currentUser = useSelector(selectCurrentUser)
  const teamStatus = useSelector(state => state.teams.status)
  const error = useSelector(state => state.teams.error)

  useEffect(() => {
      console.log("TEAMS", teams)
      console.log("CURRENT USER: ", currentUser.id);
      const db = firebaseApp.firestore();
      const unsubscribe =  db.collection('teams').where('addedUsersId', 'array-contains', currentUser.id).onSnapshot((snapshot) => {
        snapshot.docChanges().map((change) => {
          if (change.type == 'added') {
            console.log("OUR DATA: ", change.doc.data())
            dispatch(addTeamToAllTeams(change.doc.data()))
          }
          if (change.type == 'modified') {
            console.log("OUR DATA: ", change.doc.data())
            //setNewTeams([change.doc.data()])
            //dispatch(addTeamToAllTeams(change.doc.data()))
            //array.push(change.doc.data())
          }
          if (change.type == 'removed') {
            console.log("OUR DATA: ", change.doc.data())
          }
        })
      })
      return unsubscribe;
  }, [])

  let content

  if(teamStatus === 'loading') {
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
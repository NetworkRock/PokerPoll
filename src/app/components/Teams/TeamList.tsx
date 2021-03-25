// React specific imports
import React, { useEffect } from 'react'
import { Text, View, FlatList, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Redux
import { selectAllTeams, teamAdded, exchangeModifiedTeamToExistingTeam } from '../../../features/team/teamSlice'
import { selectUser } from '../../../features/users/userSlice'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'

// Style imports
import style_teamList from './style_teamList'

// Jsx elements
import renderTeamListItem from './TeamListItem'

// Firebase
import { firebaseApp } from '../../../../config'

// Enum
import { status } from '../../enums/StatusEnum'



const TeamList = (): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const teams = useAppSelector(selectAllTeams)
  const currentUser = useAppSelector(selectUser)
  const teamStatus = useAppSelector(state => state.teams.status)
  const error = useAppSelector(state => state.teams.error)

  useEffect(() => {
    const db = firebaseApp.firestore()
    if(currentUser !== null) {
      const unsubscribe = db.collection('teams')
      .where('members', 'array-contains', currentUser.uid).onSnapshot((snapshot) => {
        snapshot.docChanges().map((change) => {
          if (change.type == 'added') {
            console.info('added TEAM DATA: ', change.doc.data())
            dispatch(teamAdded(change.doc.data()))
          }
          if (change.type == 'modified', change.doc.data()) {
            console.info('modified TEAM DATA: ', change.doc.data())
            dispatch(exchangeModifiedTeamToExistingTeam(change.doc.data()))
          }
          if (change.type == 'removed') {
            console.info('removed TEAM DATA: ', change.doc.data())
          }
        })
      })
      return unsubscribe
    }
  }, [])

  let content

  if (teamStatus === status.loading) {
    content = <Text>Loading...</Text>
  } else if (teamStatus === status.succeeded) {
    content = <View style={style_teamList.listContainer}>
      <StatusBar
        barStyle='dark-content'
        hidden={false}
        backgroundColor='#00BCD4'
        translucent={true}
      />
      <FlatList
        data={teams}
        renderItem={(team) => renderTeamListItem(team, navigation, dispatch)}
        keyExtractor={(team) => team.teamId}
      />
    </View>
  } else if (teamStatus === status.failed) {
    content = <View>{error}</View>
  }

  return (
    <View style={style_teamList.listContainer}>{content}</View>
  )
}

export default TeamList
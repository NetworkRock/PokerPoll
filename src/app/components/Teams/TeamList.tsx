// react specific imports
import React, { useEffect } from 'react'
import { Text, View, FlatList, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// redux
import { selectAllTeams, addTeamToAllTeams, exchangeModifiedTeamToExistingTeam } from '../../../features/team/teamSlice'
import { selectUser } from '../../../features/users/userSlice'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'

// style imports
import style_teamList from './style_teamList'

// jsx elements
import renderTeamListItem from './TeamListItem'

// firebase
import { firebaseApp } from '../../../../config'



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
      .where('addedUsersId', 'array-contains', currentUser.uid).onSnapshot((snapshot) => {
        snapshot.docChanges().map((change) => {
          if (change.type == 'added') {
            console.info('added DATA: ', change.doc.data())
            dispatch(addTeamToAllTeams(change.doc.data()))
          }
          if (change.type == 'modified', change.doc.data()) {
            console.info('modified DATA: ', change.doc.data())
            dispatch(exchangeModifiedTeamToExistingTeam(change.doc.data()))
          }
          if (change.type == 'removed') {
            console.info('removed DATA: ', change.doc.data())
          }
        })
      })
      return unsubscribe
    }
  }, [])

  let content

  if (teamStatus === 'loading') {
    content = <Text>Loading...</Text>
  } else if (teamStatus === 'succeeded') {
    content = <View style={style_teamList.listContainer}>
      <StatusBar
        barStyle='dark-content'
        hidden={false}
        backgroundColor='#00BCD4'
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
  )
}

export default TeamList
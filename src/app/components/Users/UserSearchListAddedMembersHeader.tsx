// React specific
import React from 'react'
import { Image, View, ScrollView } from 'react-native'

// Style
import style_userForm from './style_userForm'

// Redux
import { useAppSelector } from '../../../app/hooks'
import { selectNewAddedTeamMembers } from '../../../features/team/teamSlice'

const UserSearchListAddedMemebersHeader = (): JSX.Element => {
  const addedUsers = useAppSelector(selectNewAddedTeamMembers)

  const imageArray = addedUsers.map((user: firebase.User) => (
    <Image key={user.uid} source={{
      uri: user.photoURL,
    }} style={style_userForm.iconInAddMemberHeader} />
  ))


  if (imageArray.length > 0) {
    return (
      <View style={{ flex: 1, flexGrow: 0.5, alignSelf: 'stretch' }}>
        <ScrollView horizontal={true} alwaysBounceHorizontal={false}
          contentContainerStyle={style_userForm.scrollViewAddMembersToPollScreen} style={{ flex: 1, flexGrow: 1 }}>
          {imageArray}
        </ScrollView>
      </View>
    )
  } else {
    return (<View></View>)
  }

}
export default UserSearchListAddedMemebersHeader
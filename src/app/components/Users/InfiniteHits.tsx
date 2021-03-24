// React specific
import React, { useEffect } from 'react'
import { Text, TouchableHighlight, View, Image, FlatList } from 'react-native'
import { connectInfiniteHits } from 'react-instantsearch-native'
import firebase from 'firebase'
import { useAppDispatch } from '../../hooks'

// Style
import style_userForm from '../Users/style_userForm'


// Redux
import { addMemberToNewTeam } from '../../../features/team/teamSlice'

interface Props {
  hits: Array<firebase.User>,
  hasMore: boolean,
  refineNext: () => void
}


const InfiniteHits = ({hits, hasMore, refineNext}: Props) => {
  const dispatch = useAppDispatch()
  const onAddMemberClicked = (item: firebase.User) => {
    try {
      dispatch(addMemberToNewTeam(item))
    } catch (error) {
      console.error(error)
    }
  }
    return (
      <FlatList
        data={hits}
        keyExtractor={item => item.uid}
        onEndReached={() => hasMore && refineNext()}
        renderItem={({ item }) => (
          <TouchableHighlight
            key={item.uid}
            onPress={() => onAddMemberClicked(item)}
            >
            <View style={style_userForm.listItem}>
              <View style={style_userForm.iconInListContainer} >
                <Image source={{
                  uri: item.photoURL,
                }} style={style_userForm.iconInList} />
              </View>
              <View style={style_userForm.listItemContainerWithoutImage}>
                <Text style={style_userForm.displayNameInUserSearchList}>{item.displayName}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />)
}

export default connectInfiniteHits(InfiniteHits)
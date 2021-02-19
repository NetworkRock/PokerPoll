import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  Text,
  TextInput,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import renderPollListItem from './PollListItem'
import stylePollList from './style_pollList';
import { selectAllPollsForOneGroup, pollAdded, exchangeModifiedPollToExistingPoll } from '../../../../features/polls/pollSlice'
import { selectCurrentGroup } from '../../../../features/polls/pollSlice'
import { firebaseApp } from "../../../../../config";
import { useNavigation } from '@react-navigation/native';


const SearchPollsList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentTeamId = useSelector(selectCurrentGroup)
  const polls = useSelector((state) => selectAllPollsForOneGroup(state, currentTeamId))
  const pollStatus = useSelector(state => state.polls.status)
  const error = useSelector(state => state.polls.error)

  useEffect(() => {
    const db = firebaseApp.firestore();

    console.log("G-ID: ", currentTeamId)
    const unsubscribe = db.collection('poll')
      .doc(currentTeamId)
      .collection('polls')
      .onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
        var source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ")
        snapshot.docChanges().map((change) => {
          if (change.type == 'added') {
            console.info("added DATA: ", change.doc.data())
            dispatch(pollAdded(change.doc.data()))
          }
          if (change.type == 'modified') {
            console.info("modified DATA: ", change.doc.data())
            dispatch(exchangeModifiedPollToExistingPoll(change.doc.data()))
          }
          if (change.type == 'removed') {
            console.log("removed DATA: ", change.doc.data())
          }
        })
      })
    return unsubscribe;
  }, [])

  let content

  if (pollStatus === 'loading') {
    content = <Text>Loading...</Text>
  } else if (pollStatus === 'succeeded') {
    content = <View style={stylePollList.listContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#00BCD4"
        translucent={true}
      />
      <FlatList
        data={polls}
        renderItem={(item) => renderPollListItem(item, navigation, dispatch)}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  } else if (pollStatus === 'failed') {
    content = <View>{error}</View>
  }

  return (
    <View style={stylePollList.listContainer}>{content}</View>
  );
}

export default SearchPollsList
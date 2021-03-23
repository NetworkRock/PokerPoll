// React specific
import React, { useEffect } from 'react'
import { View } from 'react-native'

// Stlye
import style_userForm from './style_userForm'

// Firebase
import { firebaseApp } from '../../../../config'

// Algolia
import { searchClient } from '../../../../config'
import {
  InstantSearch,
  Configure,
} from 'react-instantsearch-native'

// Components
import InfiniteHits from './InfiniteHits'
import UserSearchListAddedMemebersHeader from '../Users/UserSearchListAddedMembersHeader'
import SearchBox from './SearchBox'

const UserSearchList = (): JSX.Element => {
  const algoliaIndex = searchClient.initIndex('users')
  const db = firebaseApp.firestore()
  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot((snapshot) => {
      snapshot.docChanges().map((change) => {
        // Create algoliasearch index
        const data = change.doc.data()
        const objectID = change.doc.id
        if (change.type == 'added') {
          // For every new user add algolia search index
          algoliaIndex.saveObject({ ...data, objectID })
          console.info('add USER DATA: ', change.doc.data())
        }
        if (change.type == 'modified', change.doc.data()) {
          // Algolia index for users
          algoliaIndex.saveObject({ ...data, objectID })
          console.info('modified USER DATA: ', change.doc.data())
        }
        if (change.type == 'removed') {
          // Algolia index for users
          algoliaIndex.deleteObject(change.doc.id)
          console.info('removed USER DATA: ', change.doc.data())
        }
      })
    })
    return unsubscribe
  }, [])

  return (
    <View style={style_userForm.listContainer}>
      <UserSearchListAddedMemebersHeader />
      <InstantSearch indexName='users' searchClient={searchClient}>
          <Configure hitsPerPage={8} />
          <SearchBox/>
          <InfiniteHits />
      </InstantSearch>
    </View>
  )
}

export default UserSearchList
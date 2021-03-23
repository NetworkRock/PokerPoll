// React specific
import React from 'react'
import { View, TextInput } from 'react-native'
import { connectSearchBox } from 'react-instantsearch-native'

// Style
import style_userForm from '../Users/style_userForm'

interface Props {
  currentRefinement: string,
  refine: (currentRefinement: string) => void
}

const SearchBox = ({ currentRefinement, refine}: Props) => {
  return (
    <View style={style_userForm.searchListHeader}>
      <TextInput
        onChangeText={text => refine(text)}
        value={currentRefinement}
        placeholder={'Search a user...'}
        clearButtonMode={'always'}
        spellCheck={false}
        autoCorrect={false}
        autoCapitalize={'none'}
      />
    </View>
  )
}

export default connectSearchBox(SearchBox)
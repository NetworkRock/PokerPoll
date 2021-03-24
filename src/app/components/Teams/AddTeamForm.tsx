// React specific
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

// Redux
import { addTeamTitle } from '../../../features/team/teamSlice'

// Style
import style_addTeamForm from './style_addTeamForm'

const AddTeamForm = (): JSX.Element => {
  const [title, setTitle] = useState('')

  const onTitleChanged = (teamTitle: string) => setTitle(teamTitle)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addTeamTitle(title))
  }, [title])

  return (
    <View style={style_addTeamForm.container}>
      <Text style={style_addTeamForm.label}>Create a new Team</Text>
      <TextInput
        style={style_addTeamForm.textField}
        placeholder="How is your team called?"
        placeholderTextColor="#C8C8C8"
        value={title}
        autoCorrect={false}
        onChangeText={onTitleChanged}
        maxLength={38}
      />
    </View>
  )
}

export default AddTeamForm
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { addTeamTitle } from '../../../features/team/teamSlice'
import style_addTeamForm from "./style_addTeamForm";

const AddTeamForm = () => {
  const [title, setTitle] = useState('')

  const onTitleChanged = e => setTitle(e)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addTeamTitle(title));
  }, [title])

  return (
    <View style={style_addTeamForm.container}>
      <Text style={style_addTeamForm.label}>Create a new Team</Text>
      <TextInput
        style={style_addTeamForm.textField}
        placeholder="How is your team called?"
        placeholderTextColor="#C8C8C8"
        value={title}
        onChangeText={onTitleChanged}
      />
    </View>
  )
}

export default AddTeamForm
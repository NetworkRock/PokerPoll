import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styleAddPollForm from './stlye_addPollForm'
import { addCurrentPollTitle, addCurrentPollDescription } from '../../../../features/polls/pollSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onTitleChanged = e => setTitle(e)
  const onDescriptionChanged = e => setDescription(e)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(addCurrentPollTitle(title));
    dispatch(addCurrentPollDescription(description));
  }, [title, description])


  return (
    <View style={styleAddPollForm.container}>
      <View style={styleAddPollForm.headerContainer}>
        <TextInput
          style={styleAddPollForm.textField}
          placeholder="How is your poll called?"
          placeholderTextColor="#C8C8C8"
          value={title}
          onChangeText={onTitleChanged}
          maxLength={25}
        />
      </View>
      <View style={styleAddPollForm.descriptionContainer}>
        <TextInput
          style={styleAddPollForm.textArea}
          placeholder="Describe what the poll is about"
          placeholderTextColor="#C8C8C8"
          multiline={true}
          numberOfLines={12}
          value={description}
          onChangeText={onDescriptionChanged}
        />
      </View>
    </View>
  )
}

export default AddPostForm
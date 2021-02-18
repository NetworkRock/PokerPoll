import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text } from 'react-native';
import style_detailsPollForm from './style_detailsPollForm'

const AddPostForm = () => {


  return (
    <View style={style_detailsPollForm.container}>
      <Text>Vote here</Text>
    </View>
  )
}

export default AddPostForm
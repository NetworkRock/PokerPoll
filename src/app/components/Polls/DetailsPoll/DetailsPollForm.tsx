import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Dimensions } from 'react-native';
import style_detailsPollForm from './style_detailsPollForm'
import { RATING_SYSTEM_ENUM } from './RatingSystemEnum'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { selectCurrentPoll } from '../../../../features/polls/pollSlice';
import { ScrollView } from 'react-native-gesture-handler';
import RatingPollForm from './RatingPollForm';

const AddPostForm = () => {

  const poll = useSelector(selectCurrentPoll);

  return (
    <View style={style_detailsPollForm.container}>
        <RatingPollForm/>
    </View>

  )
}

export default AddPostForm
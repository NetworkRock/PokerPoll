import React, { useState, useEffect, ReactComponentElement } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { RATING_SYSTEM_ENUM } from './RatingSystemEnum'

import { selectCurrentPoll } from '../../../../features/polls/pollSlice';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import style_ratingContainer from './style_ratingContainer';

const RatingPollForm = () => {
  const poll = useSelector(selectCurrentPoll);


  useEffect(() => {

    return () => {
      if(Object.entries(nativeEvent).length !== 0) {
        const indexOfTheView = (nativeEvent.contentOffset.x) / nativeEvent.layoutMeasurement.width
        console.log("YOU CHOOSE: ", indexOfTheView)
        
      }
    }
  }, [])

  const swipeInfoString: String = "< swipe to vote >"
  let fibonacciViewArray: Array<JSX.Element> = []
  let nativeEvent: Object = {}

  fibonacciViewArray = RATING_SYSTEM_ENUM.map((el) => (
    <View style={{
      flex: 1,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      //backgroundColor: el.color,
      backgroundColor: 'white',
      width: Dimensions.get('window').width
    }}>
      <View style={globalStyles.voteCircle}>
        <Text style={globalStyles.TextStyle}>{el.name}</Text>
      </View>
    </View>
  ))


  return (
    <View style={style_ratingContainer.container}>
      <View style={style_ratingContainer.header}>
        <Text style={style_ratingContainer.pollTitle}>{poll.pollTitle}</Text>
      </View>
      <View style={style_ratingContainer.pollDescriptionContainer}>
        <ScrollView bounces={false} contentContainerStyle={style_ratingContainer.pollContentInScrollView}>
          <Text style={style_ratingContainer.pollDescription}>{poll.pollDescription}</Text>
        </ScrollView>
      </View>
      <View style={style_ratingContainer.voteInfoContainer}>
        <Text style={style_ratingContainer.voteInfoTitle}>{swipeInfoString}</Text>
      </View>
      <View style={globalStyles.MainContainer}>
        <ScrollView
          horizontal
          bounces={false}
          pagingEnabled={true}
          onMomentumScrollEnd={e => {  
            nativeEvent = e.nativeEvent
            console.log(e.nativeEvent)
          }}
          scrollEventThrottle={16}
        >
          {fibonacciViewArray}
        </ScrollView>
      </View>
    </View>
  )
}

export default RatingPollForm


const globalStyles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  voteCircle: {
    flex: 1,
    flexGrow: 0.2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0099ff'
  },
  TextStyle: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
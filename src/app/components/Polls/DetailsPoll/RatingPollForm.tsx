import React, { useState, useEffect, ReactComponentElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Dimensions, StyleSheet, Button } from 'react-native';
import { RATING_SYSTEM_ENUM } from './RatingSystemEnum'

import { selectCurrentPoll, ratePoll } from '../../../../features/polls/pollSlice';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import style_ratingContainer from './style_ratingContainer';
import { selectCurrentUser } from '../../../../features/users/userSlice';


/**
* undefined => button is shown for voting when click on safe without clicked on btn nothing is voted
* 0 => when user clicks on the button and not manipulate scroll view default value is set on button click to 0
* 1 - 13 => when user manipulate scroll view get value out of promise and set it to recentRateNumber
*/
let recentRateNumber: any = undefined

const RatingPollForm = () => {
  const [voteBegan, setVoteBegan] = useState(false)
  const poll = useSelector(selectCurrentPoll);
  const currentUser = useSelector(selectCurrentUser)
  const aref = React.useRef(null);
  const dispatch = useDispatch();
  let pollWithRating: Object


  useEffect(() => {
    return () => {
      pollWithRating = { ...poll, ...{ rating: recentRateNumber, user: currentUser.id } }

      if (pollWithRating.rating !== undefined) {
        dispatch(ratePoll({ pollWithRating }))
        recentRateNumber = undefined
      }
    }
  }, [])

  const swipeInfoString: String = "< swipe to vote >"

  const generalContent: JSX.Element = <View style={style_ratingContainer.container}>
    <View style={style_ratingContainer.header}>
      <Text style={style_ratingContainer.pollTitle}>{poll.pollTitle}</Text>
    </View>
    <View style={style_ratingContainer.pollDescriptionContainer}>
      <ScrollView 
      bounces={false} 
      contentContainerStyle={style_ratingContainer.pollContentInScrollView} 
      style={style_ratingContainer.verticaldescriptionScrollview}>
        <Text style={style_ratingContainer.pollDescription}>{poll.pollDescription}</Text>
      </ScrollView>
    </View>
  </View>

  const fibonacciViewArray: Array<JSX.Element> = RATING_SYSTEM_ENUM.map((el) => (
    <View key={el.name}
      style={{
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

  const scrollView: JSX.Element =
    <View style={style_ratingContainer.voteScrollView}>
      <View style={style_ratingContainer.voteInfoContainer}>
        <Text style={style_ratingContainer.voteInfoTitle}>{swipeInfoString}</Text>
      </View>
      <ScrollView
      ref={aref}
      horizontal
      bounces={false}
      pagingEnabled={true}
      onMomentumScrollEnd={e => {
        let rateForThePoll = 0;
        return new Promise((resolve) => {
          if (Object.entries(e.nativeEvent).length !== 0) {
            const indexOfTheView = (e.nativeEvent.contentOffset.x) / e.nativeEvent.layoutMeasurement.width
            rateForThePoll = RATING_SYSTEM_ENUM[indexOfTheView].name
            resolve(rateForThePoll)
          }
        }).then((erg) => {
          recentRateNumber = erg
        });
      }
      }
      scrollEventThrottle={16}
    >
      {fibonacciViewArray}
    </ScrollView>
    </View>

  const startVoteBtn: JSX.Element =
      <TouchableOpacity
        style={style_ratingContainer.startVotingBtn}
        onPress={() => {
          setVoteBegan(true)
          recentRateNumber = 0;
        }}>
        <Text style={style_ratingContainer.btnText}>Click and start voting</Text>
      </TouchableOpacity>
    return (
      <View style={style_ratingContainer.container}>
        {generalContent}
        {
          voteBegan ? scrollView : startVoteBtn
        }
      </View>
    )
}

export default RatingPollForm


const globalStyles = StyleSheet.create({
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
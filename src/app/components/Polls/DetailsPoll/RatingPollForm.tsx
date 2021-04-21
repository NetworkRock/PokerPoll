
// React specific
import React, { useState, useEffect } from 'react'
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

// Redux
import { selectUser } from '../../../../features/users/userSlice'
import { selectCurrentPoll, selectCurrentTeam } from '../../../../features/polls/pollSlice'
import { ratePoll } from '../../../../features/polls/rateSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'

// Style
import style_ratingContainer from './style_ratingContainer'

// Enums
import { RATING_SYSTEM_ENUM } from './RatingSystemEnum'

// Models
import { Rating } from '../../../models/Rating'

/* IMPORTANT TO KNOW
* undefined => button is shown for voting when click on safe without clicked on btn nothing is voted
* 0 => when user clicks on the button and not manipulate scroll view default value is set on button click to 0
* 1 - 13 => when user manipulate scroll view get value out of promise and set it to recentRateNumber
*/
let recentRateNumber: any = undefined

const RatingPollForm = (): JSX.Element => {
  const [voteBegan, setVoteBegan] = useState(false)
  const poll = useAppSelector(selectCurrentPoll)
  const team = useAppSelector(selectCurrentTeam)
  const user = useAppSelector(selectUser)
  const aref = React.useRef(null)
  const dispatch = useAppDispatch()


  useEffect(() => {
    return () => {        
      // OLD CODE const pollWithRating = { ...poll, ...{ rating: recentRateNumber, user: user?.uid } }
      if (recentRateNumber !== undefined) {
        const rating = new Rating(
          user?.uid,
          team?.teamId,
          poll?.pollId,
          recentRateNumber)
        dispatch(ratePoll(rating))
        recentRateNumber = undefined
      }
    }
  }, [])

  const swipeInfoString = '< swipe to vote >'

  const generalContent: JSX.Element = <View style={style_ratingContainer.container}>
    <View style={style_ratingContainer.header}>
      <Text style={style_ratingContainer.pollTitle}>{poll?.title}</Text>
    </View>
    <View style={style_ratingContainer.pollDescriptionContainer}>
      <ScrollView 
      bounces={false} 
      contentContainerStyle={style_ratingContainer.pollContentInScrollView} 
      style={style_ratingContainer.verticaldescriptionScrollview}>
        <Text style={style_ratingContainer.pollDescription}>{poll?.description}</Text>
      </ScrollView>
    </View>
  </View>

  const fibonacciViewArray: Array<JSX.Element> = RATING_SYSTEM_ENUM.map((estimateObj) => (
    <View key={estimateObj.name}
      style={{
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // CHECK OUT IF THATS COOL - backgroundColor: el.color,
        backgroundColor: 'white',
        width: Dimensions.get('window').width
      }}>
      <View style={globalStyles.voteCircle}>
        <Text style={globalStyles.TextStyle}>{estimateObj.name}</Text>
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
      onScroll={e => {
        let rateForThePoll = 0
        console.log(e)
        return new Promise((resolve) => {
          if (Object.entries(e.nativeEvent).length !== 0) {
            const indexOfTheView = (e.nativeEvent.contentOffset.x) / e.nativeEvent.layoutMeasurement.width
            if (indexOfTheView % 1 === 0) {
              rateForThePoll = RATING_SYSTEM_ENUM[indexOfTheView].name
              resolve(rateForThePoll)
            } 
          }
        }).then((erg) => {
          console.log(erg)
          recentRateNumber = erg
        })
      }
      }
      scrollEventThrottle={16}
    >
      {fibonacciViewArray}
    </ScrollView>
    </View>

  const startVoteBtn: JSX.Element =
    <View style={style_ratingContainer.startVotingBtn}>
      <Button
        title='Click and vote!'
        onPress={() => {
          setVoteBegan(true)
          recentRateNumber = 0
        }}>
      </Button>
      </View>
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
})
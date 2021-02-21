import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image } from 'react-native';
import style_detailsPollForm from './style_detailsPollForm'
import { RATING_SYSTEM_ENUM } from './RatingSystemEnum'
import {
  PieChart,
} from "react-native-chart-kit";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { selectCurrentUser } from '../../../../features/users/userSlice'
import DetailPollCloseAdminView from './DetailPollCloseAdminView';
import { POLL_FLAG_ENUM } from '../PollList/PollFlagEnum';

const ResultPollForm = (props) => {
  const currentUser = useSelector(selectCurrentUser)

  const userWhoAlreadyRateDetails = props.route.params.users
  let userRatings = props.route.params.poll.userRatings
  let poll = props.route.params
  let adminView: boolean = false;
  let imageArray

  if(poll.poll.createdBy === currentUser.id) {
    adminView = true
  }

  imageArray = userWhoAlreadyRateDetails.map((user, index) => (
    <View key={user.id} style={style_detailsPollForm.userIconContainer}>
      <View style={style_detailsPollForm.userIconContainerWithoutRate}>
        <Image source={{
          uri: user.profilePictureURL,
        }} style={style_detailsPollForm.iconInAddMemberHeader} />
        <Text style={style_detailsPollForm.userName}>{user.displayName}</Text>
      </View>
      <View style={style_detailsPollForm.rateNumberContainer}>
        <Text style={style_detailsPollForm.rateNumber}>{userRatings[index].rate}</Text>
      </View>
    </View>
  ))



  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const resultArray: Array<Object> = [];


  RATING_SYSTEM_ENUM.map((el) => {
    let counter = 0
    let data
    let fibunatiConfig = { name: ":times " + el.name, legendFontColor: el.legendFontColor, color: el.color, legendFontSize: 15 }
    for(let i = 0; i < userRatings.length; i++) {
      if (userRatings[i].rate === el.name) {
        counter++
        data = { ...fibunatiConfig, ...{ rating: counter} }
        resultArray.push(data);
      }
    }
    counter = 0
  })

  return (
    <View style={style_detailsPollForm.container}>
      {poll.poll.pollFlag !== POLL_FLAG_ENUM.CLOSE && adminView 

        ? <DetailPollCloseAdminView />

        :

          <View style={style_detailsPollForm.adminviewContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{poll.poll.pollEstimation}</Text>
          </View>

      }
      <View style={style_detailsPollForm.chartContainer}>
        <PieChart
          data={resultArray}
          width={350}
          height={200}
          chartConfig={chartConfig}
          accessor={"rating"}
          backgroundColor={"transparent"}
          paddingLeft={"40"}
          center={[0, 0]}
          absolute
        />
      </View>
        <ScrollView bounces={false} contentContainerStyle={style_detailsPollForm.pollContentInScrollView} style={style_detailsPollForm.scrollViewContainer}>
          {imageArray}
        </ScrollView>
      
    </View>

  )
}

export default ResultPollForm
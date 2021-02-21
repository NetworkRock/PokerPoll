import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Image } from 'react-native';
import style_detailsPollForm from './style_detailsPollForm'
import { RATING_SYSTEM_ENUM } from './RatingSystemEnum'
import {
  PieChart,
} from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';


const ResultPollForm = (props) => {


  const userWhoAlreadyRateDetails = props.route.params.users

  

  let imageArray

  imageArray = userWhoAlreadyRateDetails.map((user) => (
    <View>
    <Image key={user.id} source={{
      uri: user.profilePictureURL,
    }} style={style_detailsPollForm.iconInAddMemberHeader} />
    <Text>{user.displayName}</Text>
    </View>
  ))

  console.log("ARSCHLECKEN GEIL: ",  userWhoAlreadyRateDetails)


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
    let fibunatiConfig = { name: el.name, legendFontColor: el.legendFontColor, color: el.color, legendFontSize: 15 }
    let data3 = { ...fibunatiConfig, ...{ rating: Math.round(Math.random() * 100) } }
    resultArray.push(data3);
  })
  // console.log("RESULT: ", resultArray);

  return (
    <View style={style_detailsPollForm.container}>
      <View style={style_detailsPollForm.chartContainer}>
        <Text style={style_detailsPollForm.chartTitle} numberOfLines={1}>HIER STEHT DER TITLE</Text>
        <PieChart
          data={resultArray}
          width={350}
          height={200}
          chartConfig={chartConfig}
          accessor={"rating"}
          backgroundColor={"transparent"}
          paddingLeft={"0"}
          center={[0, 0]}
          absolute
        />
      </View>
      <View style={style_detailsPollForm.pollDescriptionContainer}>
        <ScrollView bounces={false} contentContainerStyle={style_detailsPollForm.pollContentInScrollView}>
          {imageArray}<Text>HIER STEHT WAS</Text>
        </ScrollView>
      </View>
    </View>

  )
}

export default ResultPollForm
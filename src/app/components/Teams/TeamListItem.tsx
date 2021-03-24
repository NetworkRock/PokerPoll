// React specific
import React from 'react'
import { TouchableHighlight, View, Text, ListRenderItemInfo } from 'react-native'

// Style
import style_teamList from './style_teamList'

// Redux
import { addCurrentSelectedGroup } from '../../../features/polls/pollSlice'

// Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Models
import { Team } from '../../models/Team'
import { AppDispatch } from '../../store'


const renderTeamListItem = (team: ListRenderItemInfo<Team>, navigation, dispatch: AppDispatch): JSX.Element => {
  const onAddCurrentSelectedGroup = () => {
    try {
      dispatch(addCurrentSelectedGroup(team.item.teamId))
    } catch (error) {
      console.error(error)
    } finally {
      navigation.navigate('PollsForGroupStack')
    }
  }

  return (
    <TouchableHighlight
      key={team.item.teamId}
      onPress={onAddCurrentSelectedGroup}>
      <View style={style_teamList.listItem}>
        <View style={style_teamList.listItemContainerWithoutImage}>
          <Text style={style_teamList.title}>{team.item.displayName}</Text>
        </View>
        <View style={style_teamList.iconInListContainer}>
            <Icon name='account-group' size={35} color='white' />
        </View>
      </View>
    </TouchableHighlight>
  )}

export default renderTeamListItem
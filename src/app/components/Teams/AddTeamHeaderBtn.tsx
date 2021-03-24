// React specific
import React from 'react'
import { View,  Button } from 'react-native'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Redux 
import { useAppDispatch, useAppSelector } from '../../hooks'
import { unwrapResult } from '@reduxjs/toolkit'
import { selectTeamTitle, addNewTeam } from '../../../features/team/teamSlice'
import { selectNewAddedTeamMembers } from '../../../features/team/teamSlice'
import { selectUser } from '../../../features/users/userSlice'

// Models
import { Team } from '../../models/Team'

// Style
import style_addTeamForm from './style_addTeamForm'

// Enum
import { HEADER_BTN_TYPES } from '../NavigationComponents/HeaderButtonEnum'



const AddTeamHeaderBtn = (): JSX.Element => {
  const navigation = useNavigation()
  const teamTitle = useAppSelector(selectTeamTitle)
  const currentUser = useAppSelector(selectUser)
  const members = useAppSelector(selectNewAddedTeamMembers)
  

  const canSave =
    [teamTitle.trim().length, members.length > 0].every(Boolean)

  const dispatch = useAppDispatch()

  const onCreatedTeamClicked = async () => {
    if (canSave) {
      try {
        if (currentUser !== null) {
          const team = new Team(
            '',
            teamTitle,
            '',
            members,
            currentUser
          )
          const resultAction = await dispatch(
            addNewTeam(team)
          )
          unwrapResult(resultAction)
        }
      } catch (error) {
        console.error('Failed to save the team: ', error)
      } finally {
        navigation.navigate('PollTeamStack')
      }
    }
  }

  return (
      <View style={style_addTeamForm.btn}>
        <Button title={HEADER_BTN_TYPES.CREATE} onPress={onCreatedTeamClicked} disabled={!canSave}/>
      </View>
  )

  }

export default AddTeamHeaderBtn